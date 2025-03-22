import React, { useState } from 'react';
import { Badge, Card, Space, Input } from 'antd';
import { MdOutlineEmail, MdPassword, MdAccountCircle } from 'react-icons/md'

import './xau.css'

import { createUser, signIn } from './api/api';


const SignUp: React.FC = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (name: string, event: { target: { value: any } }) => {
    setData({ ...data, [name]: event.target.value });
    console.log(data)
  }

  const submit = async () => {
    const params = {
      username: data.username,
      email: data.email,
      password: data.password
    }

    const result = await createUser(params);
    console.log(result);
    // redirect to sign in
    // auto sign in in future
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <Badge.Ribbon text="Welcome" color="green">
          <Card size="small" style={{ color: 'white', background: 'black', border: 'none' }}>
            <p style={{ fontSize: 41, lineHeight: 0, paddingTop: 30 }}>xau-xau</p>
            <p style={{ maxWidth: 400, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', color: 'grey' }}>Welcome the the largest local marketplace for second hand goods.</p>
            <Space.Compact style={{ width: '70%' }}>
              <MdAccountCircle size={40} style={{ paddingRight: 10 }} />
              <Input style={{ width: '100%' }} placeholder='Username' size='large' onChange={(e) => handleChange('username', e)} />
            </Space.Compact>
            <Space.Compact style={{ width: '70%', paddingTop: 20 }}>
              <MdOutlineEmail size={40} style={{ paddingRight: 10 }} />
              <Input style={{ width: '100%' }} placeholder='Email' size='large' onChange={(e) => handleChange('email', e)} />
            </Space.Compact>
            <Space.Compact style={{ width: '70%', paddingTop: 20 }}>
              <MdPassword size={40} style={{ paddingRight: 10 }} />
              <Input style={{ width: '100%' }} placeholder='Password' size='large' type='password' onChange={(e) => handleChange('password', e)} />
            </Space.Compact>
            <p>Already have an account? <a href='/signin'>Sign In</a></p>
            <div style={{ paddingRight: '15%', paddingTop: 20, paddingBottom: 100 }}>
              <button style={{ float: 'right' }} onClick={submit}>
                Get Started
              </button>
            </div>
          </Card>
        </Badge.Ribbon>
      </Space>
    </div>

  );

}

export default SignUp;
