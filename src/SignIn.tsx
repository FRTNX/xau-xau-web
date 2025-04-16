import React, { useState } from 'react';
import { Badge, Card, Space, Input, message } from 'antd';
import { MdOutlineEmail, MdPassword } from 'react-icons/md'

import { signin } from './auth/api-auth';
import auth from './auth/auth-helper'

import './xau.css'


const SignIn: React.FC = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name: string, event: { target: { value: any } }) => {
    setData({ ...data, [name]: event.target.value });
    console.log(data)
  }

  const submit = async () => {
    const params = {
      email: data.email,
      password: data.password
    }

    const result = await signin(params);
    console.log(result)
    if (result && result.token) {
      auth.authenticate(result)
      message.success('Sign up successful!');
      window.location.href = '/'
    }

  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <Badge.Ribbon text="Welcome" color="green" style={{}}>
          <Card size="small" style={{ color: 'white', background: 'black', border: 'none' }}>
            <p style={{ fontSize: 31 }}>Sign In</p>
            <Space.Compact style={{ width: '70%' }}>
              <MdOutlineEmail size={40} style={{ paddingRight: 10 }} />
              <Input style={{ width: '100%' }} placeholder='Email' size='large' onChange={(e) => handleChange('email', e)} />
            </Space.Compact>
            <Space.Compact style={{ width: '70%', paddingTop: 20 }}>
              <MdPassword size={40} style={{ paddingRight: 10 }} />
              <Input style={{ width: '100%' }} placeholder='Password' size='large' type='password' onChange={(e) => handleChange('password', e)} />
            </Space.Compact>
            <p>Don't have an account? <a href='/register'>Register</a></p>

            <div style={{ paddingRight: '15%', paddingTop: 10, paddingBottom: 100 }}>
              <button style={{ float: 'right' }} onClick={submit}>
                Sign In
              </button>
            </div>
          </Card>
        </Badge.Ribbon>
      </Space>
    </div>
  );
}

export default SignIn;
