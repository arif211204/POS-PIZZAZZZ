import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../api';
import { setProductPaginationActionCreator } from '../productPagination/action';
import { setAlertActionCreator } from '../alert/action';

const ActionType = {
  RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

function receiveProductsActionCreator(products) {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    payload: { products },
  };
}

function editProductActionCreator(product) {
  return {
    type: ActionType.EDIT_PRODUCT,
    payload: { product },
  };
}

function deleteProductActionCreator(productId) {
  return {
    type: ActionType.DELETE_PRODUCT,
    payload: { productId },
  };
}

function asyncGetAllProducts() {
  return async (dispatch) => {
    try {
      const { data } = await api.get('/products');
      await dispatch(receiveProductsActionCreator(data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

function asyncReceiveProducts({
  name,
  categoryId,
  sortBy,
  orderBy,
  isPaginated,
  page,
  perPage,
}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const nameQ = name ? `name=${encodeURIComponent(name)}&` : '';
      const categoryIdQ =
        categoryId && categoryId !== '0'
          ? `categoryId=${encodeURIComponent(categoryId)}&`
          : '';
      const sortByQ = sortBy ? `sortBy=${encodeURIComponent(sortBy)}&` : '';
      const orderByQ = orderBy ? `orderBy=${encodeURIComponent(orderBy)}&` : '';
      const isPaginatedQ =
        isPaginated === 'false'
          ? `isPaginated=${encodeURIComponent(false)}&`
          : `isPaginated=${encodeURIComponent(true)}&`;
      const pageQ = page ? `page=${encodeURIComponent(page)}&` : '';
      const perPageQ = perPage ? `perPage=${encodeURIComponent(perPage)}&` : '';
      const allQuery = `?${nameQ}${categoryIdQ}${sortByQ}${orderByQ}${isPaginatedQ}${pageQ}${perPageQ}`;

      const { data } = await api.get(`/products${allQuery}`);
      dispatch(receiveProductsActionCreator(data.data));
      dispatch(setProductPaginationActionCreator(data.info));
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncCreateProduct(formData) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.post('/products', formData);
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

function asyncEditProduct({ productId, formData }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const { data } = await api.patch(`/products/${productId}`, formData);
      dispatch(editProductActionCreator(data.data));
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

function asyncDeleteProduct(productId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      await api.delete(`/products/${productId}`);
      dispatch(deleteProductActionCreator(productId));
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
  receiveProductsActionCreator,
  editProductActionCreator,
  deleteProductActionCreator,
  asyncReceiveProducts,
  asyncCreateProduct,
  asyncEditProduct,
  asyncDeleteProduct,
  asyncGetAllProducts,
};
