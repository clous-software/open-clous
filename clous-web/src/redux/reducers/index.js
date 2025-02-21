import { combineReducers } from 'redux';
import categories from './categories';
import blog from './blog';
import suscriber from './suscriber';

export default combineReducers( {
    categories,
    blog,
    suscriber,
})