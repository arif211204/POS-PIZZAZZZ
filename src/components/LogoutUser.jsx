import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function LogoutUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncUnsetAuthUser());
  }, [dispatch]);

  return <div>Logout user .......</div>;
}

export default LogoutUser;
