import reducer from '../../utils/reducer';
import {types} from './actions.js';

const initState = {
  data: null,
  isLoading: false,
  error: false
};

export default reducer(initState, {

  [types.UPDATE]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [types.UPDATE_SUCCESS]: (state) => {
    return {
      ...state,
      isLoading: false
    };
  },

  [types.UPDATE_FAILURE]: (state) => {
    return {
      ...state,
      isLoading: false,
      error: true
    };
  },

  [types.GET]: (state) => {
    return {
      ...state,
      isLoading: true
    };
  },

  [types.GET_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: action.payload,
      isLoading: false
    };
  },

  [types.GET_FAILURE]: (action) => {
    return {
      ...state,
      isLoading: false,
      error: true
    };
  }

});
