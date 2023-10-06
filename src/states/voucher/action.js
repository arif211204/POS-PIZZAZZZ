import { api } from '../../api';

const ActionType = {
  GETALL_VOUCHER: 'GETALL_VOUCHER',
};

function getAllVoucher(voucher) {
  return {
    type: ActionType.GETALL_VOUCHER,
    payload: {
      voucher,
    },
  };
}
function asyncgetAllVoucher() {
  return async (dispatch) => {
    try {
      const { data } = await api.get('/vouchers');
      dispatch(getAllVoucher(data.data));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}
export { ActionType, asyncgetAllVoucher };
