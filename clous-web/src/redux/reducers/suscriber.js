import {
SUSCRIBER_SUCCESS,
SUSCRIBER_FAIL 
  } from "../actions/newsletter/types";
  
  const initialState = {
    suscriber: null,
  };
  
  export default function suscriber(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SUSCRIBER_SUCCESS:
        return {
          ...state,
          suscriber: payload.suscriber,
        };
      case SUSCRIBER_FAIL:
        return {
          ...state,
          suscriber: null,
        };
      default:
        return state;
    }
  }
  