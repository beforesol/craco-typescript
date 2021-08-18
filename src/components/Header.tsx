import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserName } from '@reducers/UserReducer';

interface IOwnProps {
};

const Header: React.FC<IOwnProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserName('jeonsol'));
  }, []);

  return (
    <div></div>
  )
}

export default Header;