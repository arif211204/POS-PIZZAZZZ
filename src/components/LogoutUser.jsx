import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function LogoutUser() {
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  useEffect(() => {
    dispatch(asyncUnsetAuthUser());
    console.log('succes logout');
    console.log('authUser in logout :>> ', authUser);
  }, [dispatch]);

  return <div>Logout....</div>;
}

export default LogoutUser;
