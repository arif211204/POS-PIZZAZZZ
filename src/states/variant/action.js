import { api } from '../../api';

const ActionType = {
  GETALL_VARIANTS: 'GETALL_VARIANTS',
};

function getAllvariant(variant) {
  return {
    type: ActionType.GETALL_VARIANTS,
    payload: {
      variant,
    },
  };
}
function asyncgetAllVariant() {
  return async (dispatch) => {
    try {
      const { data } = await api.get('/variants');
      console.log('Data fetched for variants:', data.data);
      dispatch(getAllvariant(data.data));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

export { ActionType, asyncgetAllVariant };
