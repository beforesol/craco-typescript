import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  name: string;
}

const userState: UserState = {
  name: 'User'
};

export const slice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setUserName(state: UserState, action) {
      console.log('action', action);
      state.name = action.payload;
    },
  },
  extraReducers: {
  },
});

// 일반 리듀서 export. 필요 없을 경우 삭제
export const {
  setUserName,
} = slice.actions;

const UserReducer = slice.reducer;
export default UserReducer;
