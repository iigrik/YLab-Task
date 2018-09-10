import * as api from '../../api';

export const types = {
  UPDATE: Symbol('UPDATE'),
  UPDATE_SUCCESS: Symbol('UPDATE_SUCCESS'),
  UPDATE_FAILURE: Symbol('UPDATE_FAILURE'),

  GET: Symbol('GET'),
  GET_SUCCESS: Symbol('GET_SUCCESS'),
  GET_FAILURE: Symbol('GET_FAILURE')
};


export default {

  update: (id, value) => {
    return async dispatch => {
      dispatch({type: types.UPDATE});

      try {
        await api.list.save(id, value);
        dispatch({type: types.UPDATE_SUCCESS});
      } catch (e) {
        dispatch({type: types.UPDATE_FAILURE});
        throw e;
      }
    };
  },

  getData: () => {
    return async dispatch => {
      dispatch({type: types.GET});

      try {
        const result = await api.list.get();
        dispatch({type: types.GET_SUCCESS, payload: result});
      } catch (e) {
        dispatch({type: types.GET_FAILURE});
        throw e;
      }
    };
  }
}
