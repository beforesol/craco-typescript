# Setting
CRA 설치
```
yarn create react-app my-app --template typescript
```

craco 설치
```
yarn add @craco/craco --save --dev
```

package.json에서 script를 수정하여 프로젝트 실행시 react-scripts 대신 craco를 통해 실행
```
"scripts": {
   "start": "craco start",
   "build": "craco build",
   "test": "craco test --env=jsdom"
}
```

프로젝트 가장 최상단 위치에서 craco.config.js 라는 파일을 생성한 뒤, 원하는 customizing을 하면 된다.

# Sass-loader
1. node-sass 설치 (4점대로 설치해야 오류가 안생긴다.)

2. [이름].scss 파일명을 [이름].module.scss 로 변경

3. .tsx 파일에 아래와 같이 사용

```
import React from 'react';
import style from './App.module.scss';

function App() {
  return (
    <div className={style.App}>
      <div className={style.title}>hi</div>
    </div>
  );
}

export default App;
```

# Alias
react-scripts 4.0.0에선 tsconfig.json paths 설정할 때 버그가 있어서 3.4.4로 다운그레이드 해서 받아야한다.

CRA에서 tsconfig의 compilerOptions수정을 허용하지 않는다. 따라서 tsconfig.paths.json 이라는 파일을 생성해 그곳에 alias 옵션을 작성하고 tsconfig.json 파일에서 tsconfig.paths.json을 extends 해줘야 한다.

tsconfig.json
```
{
  ...
  "extends": "./tsconfig.paths.json"
}
```

tsconfig.paths.json
```
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@assets/*": [
        "./assets/*"
      ]
    }
  }
}
```

craco-alias 설치
```
yarn add craco-alias --save --dev
```

craco.config.js
```
const CracoAlias = require('craco-alias');

module.exports = {
 plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  }
```

# Plugin

craco.config.js
```
const { DefinePlugin } = require("webpack");

module.exports = {
  webpack: {
    plugins: [
      new DefinePlugin({
        'process.env': {
          'device': JSON.stringify('mobile'),
        }
      }),
    ]
  }
};
```

# devServer

host, port 변경하려면 .env.development 파일을 만들어서 아래와 같이 작성한다.

```
HOST=0.0.0.0
PORT=8888
```

# Production

production에서만 plugin 추가하는 법
craco.config.js

```
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        webpackConfig.plugins = [
          ...webpackConfig.plugins,
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, './src/assets/img'),
                to: path.resolve(__dirname, './build/static/img')
              },
            ]
          }),
        ]
      }
      return webpackConfig;
    }
};

```

