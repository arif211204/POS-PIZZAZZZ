/* eslint-disable default-param-last */
import { ActionType } from './action';

const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case ActionType.SET_TRANSACTION:
      return action.payload.transactions; // Updated: Access 'transactions' in payload
    case ActionType.GET_ALL:
      return action.payload.dataTransaksi; // Updated: Access 'dataTransaksi' in payload
    default:
      return state;
  }
};

export default transactionReducer;
