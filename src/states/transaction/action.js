import { api } from '../../api';

const ActionType = {
  SET_TRANSACTION: 'SET_TRANSACTION',
  GET_ALL: 'GET_ALL',
};

// Action to set transactions
function setTransaction(transactions) {
  return {
    type: ActionType.SET_TRANSACTION,
    payload: {
      transactions,
    },
  };
}

// Action to get all transactions
function asyncGetAllTransaction() {
  return async (dispatch) => {
    try {
      const response = await api.get('/transVariant');
      dispatch(setTransaction(response.data.data));
      console.log(
        'Get all transactions successful. Response:',
        response.data.data
      );
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
}

// Action to perform a transaction
function asyncTransaction(transactionData) {
  return async (dispatch) => {
    try {
      console.log('Sending transaction data:', transactionData);
      const response = await api.post('/transactions', transactionData);
      console.log('Transaction successful. Response:', response.data.data);

      dispatch(setTransaction(response.data.data));
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };
}

export { ActionType, asyncTransaction, asyncGetAllTransaction };
