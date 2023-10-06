import jwtDecode from 'jwt-decode';
import { api } from '../../api';
import {
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
} from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { id } = jwtDecode(token);

      // GET user by userId
      const { data } = await api.get(`/users/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setAuthUserActionCreator(data.data));
    } catch {
      dispatch(asyncUnsetAuthUser());
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
