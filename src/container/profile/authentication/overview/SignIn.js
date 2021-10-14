import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { loginAPI, setHeader, getUserRole, setHeaderWithWebToken, getVendorName } from '../../../../redux/apis/DataAction';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import firebase from './../../../../firebase';
import { Spin, notification } from 'antd';
import { addDepart, addVendorName } from '../../../../redux/ticket/actionCreator';
import { connectSocket } from '../../../../redux/socket/socketAction';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
    loader: false
  });
  
  const handleSubmit = (value) => {
    if (!(['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(window.navigator.platform) && window.navigator.platform.match(/^Mac/))) {
      Notification.requestPermission().then(permission => {
        setState({ ...state, loader: true })
        if (permission == 'granted') {
          navigator.serviceWorker.getRegistration().then(async (reg) => {
            firebase.messaging().getToken()
              .then(token => {
                loginUser({ ...value, Token: token })
              })
              .catch(e => {
                // console.log('check error')
              })
          });
        }
        else {
          loginUser({ ...value, Token: 'not provided' })
        }
      });
    }
    else {
      loginUser({ ...value, Token: 'not provided' })
    }
  };

  const loginUser = (value) => {
    dispatch(loginAPI({ username: value.username, password: value.password, Token: value.Token }))
      .then(data => {
        // console.log('cehck23343', data)
        if (data[0].err) {
          setState({ ...state, loader: false })
          alert(data[0].err)
        }
        else {
          data = { ...data[0][0], jwtToken: data[1] }
          dispatch(connectSocket(data.LoginID))
          dispatch(getUserRole({ loginid: data.LoginID })).then(dataOne => {
            localStorage.setItem('userRole', JSON.stringify(dataOne))
            localStorage.setItem('user', JSON.stringify(data))
            dispatch(login(data));
            setHeaderWithWebToken()
            dispatch(getVendorName({})).then(data => {
            // console.log('inside123',data)

              setState({ ...state, loader: false })
              dispatch(addVendorName(data[0]))
              history.push('/admin');
              // setState({ ...state, departs, loader: false  });
            })
            // // console.log('aaaa', dataOne)
          })
        }
      })
  }

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <Spin indicator={<img src="/img/icons/loader.gif" style={{ width: 100, height: 100 }} />} spinning={state.loader} >
      <AuthWrapper>
        <br /><br /><br /><br />
        <div className="auth-contents">
          <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
            <Heading as="h3">
              Sign in to <span style={{ color: '#f08902' }} className="color-secondary">PU-CRM</span>
            </Heading>
            <Form.Item
              name="username"
              rules={[{ message: 'Please input your username!', required: true }]}
              // initialValue="Username"
              label="Username"
            >
              <Input />
              {/* //test  */}
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ message: 'Password is required', required: true }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
               <Button size="large"  className="btn-signin" htmlType="submit" type="primary" size="large">
                {isLoading ? 'Loading...' : 'Sign In'}
              </Button>
            </Form.Item>
            {/* <p className="form-divider">
            <span>Or</span>
          </p> */}
            {/* <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
          </Form>
        </div>
      </AuthWrapper>
    </Spin>
  );
};

export default SignIn;
