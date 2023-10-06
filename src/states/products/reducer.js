import { ActionType } from './action';

function productsReducer(products = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_PRODUCTS:
      return action.payload.products;

    case ActionType.EDIT_PRODUCT:
      return products.map((product) =>
        product.id === action.payload.product.id
          ? action.payload.product
          : product
      );

    case ActionType.DELETE_PRODUCT:
      return products.filter(
        (product) => product.id !== action.payload.productId
      );

    default:
      return products;
  }
}

export default productsReducer;
