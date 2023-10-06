import { ActionType } from './action';

function voucherReducers(voucher = [], action = {}) {
  switch (action.type) {
    case ActionType.GETALL_VOUCHER:
      return action.payload.voucher;

    default:
      return voucher;
  }
}
export default voucherReducers;
