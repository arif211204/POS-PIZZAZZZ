import { ActionType } from './action';

function variantReducers(variants = [], action = {}) {
  switch (action.type) {
    case ActionType.GETALL_VARIANTS:
      return action.payload.variant;

    default:
      return variants;
  }
}

export default variantReducers;
