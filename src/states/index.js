import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';
import usersReducer from './users/reducer';
import transactionReducer from './transaction/reducer';
import voucherReducers from './voucher/reducers';
import variantReducers from './variant/reducers';
import alertReducer from './alert/reducer';
import productPaginationReducer from './productPagination/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    alert: alertReducer,
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    categories: categoriesReducer,
    products: productsReducer,
    productPagination: productPaginationReducer,
    users: usersReducer,
    transaction: transactionReducer,
    voucher: voucherReducers,
    variants: variantReducers,
  },
});

export default store;
