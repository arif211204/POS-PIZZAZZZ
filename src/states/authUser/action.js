import { api } from '../../api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}
function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncSetAuthUser({ username, password }) {
  return async (dispatch) => {
    // GET user login
    const { data } = await api.post('/users/auth', { username, password });
    localStorage.setItem('token', data.data.token);
    window.location.reload();
    dispatch(setAuthUserActionCreator(data.data.user));
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(unsetAuthUserActionCreator());
  };
}

function asyncRegisterUser(formData) {
  return async (dispatch) => {
    try {
      // POST user register
      const { data } = await api.post('/users', formData);
      dispatch(asyncSetAuthUser(data.data.user));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  receiveUsersActionCreator,
};
