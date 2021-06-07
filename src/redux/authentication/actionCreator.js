import Cookies from 'js-cookie';
import actions from './actions';
import {setHeader} from '../apis/DataAction'

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (data) => {
  return async dispatch => {
    try {
      dispatch(loginBegin());
      setTimeout(() => {
        console.log('aaa', JSON.stringify(data))
        localStorage.setItem('user', JSON.stringify(data))
        setHeader()
        return dispatch(loginSuccess(data));
      }, 1000);
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('logedIn');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
