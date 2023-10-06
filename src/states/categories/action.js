import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../api';
import { setAlertActionCreator } from '../alert/action';

const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  EDIT_CATEGORY: 'EDIT_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: { categories },
  };
}

function editCategoryActionCreator(category) {
  return {
    type: ActionType.EDIT_CATEGORY,
    payload: { category },
  };
}

function deleteCategoryActionCreator(categoryId) {
  return {
    type: ActionType.DELETE_CATEGORY,
    payload: { categoryId },
  };
}

function asyncReceiveCategories({ name } = {}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const nameQ = name ? `name=${encodeURIComponent(name)}` : '';
      const allQuery = `?${nameQ}`;

      const { data } = await api.get(`/categories${allQuery}`);
      dispatch(receiveCategoriesActionCreator(data.data));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateCategory(formData) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.post('/categories', formData);
      dispatch(setAlertActionCreator());
      return true;
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncEditCategory({ categoryId, formData }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.patch(`/categories/${categoryId}`, formData);
      dispatch(editCategoryActionCreator(data.data));
      dispatch(setAlertActionCreator());
      return true;
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncDeleteCategory(categoryId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.delete(`/categories/${categoryId}`);
      dispatch(deleteCategoryActionCreator(categoryId));
      dispatch(setAlertActionCreator());
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
  editCategoryActionCreator,
  deleteCategoryActionCreator,
  asyncReceiveCategories,
  asyncCreateCategory,
  asyncEditCategory,
  asyncDeleteCategory,
};
