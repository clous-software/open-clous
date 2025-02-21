import {
    SUSCRIBER_SUCCESS,
SUSCRIBER_FAIL
} from './types';


import axios from 'axios';


export const suscriber = (email) => async dispatch => {

    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };

      const body = JSON.stringify({email})

      try {
        const res = await axios.post(
           `${process.env.REACT_APP_API_URL}/api/correo/suscriber`, body,
          config
        );
        if (res.status === 200) {
          dispatch({
            type: SUSCRIBER_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: SUSCRIBER_FAIL
          });
        }
      } catch (error) {
        dispatch({
          type: SUSCRIBER_FAIL
        });
      }
    };