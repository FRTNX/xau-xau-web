// @ts-nocheck
import { signin } from './auth/api-auth';
import auth from './auth/auth-helper';

import "./components/fancy-buttons/hover.glow.css";

import React, { useState } from 'react';
import { Form, Input, Button, ConfigProvider, theme, message } from 'antd';
import { Fade } from 'react-awesome-reveal';

const SignIn = () => {
  const mobile = window.innerWidth < 500;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = await signin(values)
    if (result && result.token) {
      auth.authenticate(result)
      message.success('Sign up successful!');
      window.location.href = '/'
    }
  };

  return (
    <ConfigProvider
    // theme={{ algorithm: [theme.darkAlgorithm], token: { colorBgContainer: '#292929' } }}
    >
      <div style={{ minHeight: '70vh' }}>
        <Fade direction='up' triggerOnce>
          <div
            style={{
              maxWidth: mobile ? 400 : 450,
              marginLeft: 'auto',
              marginRight: 'auto',
              background: 'black',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              padding: 10,
              borderRadius: 5,
              paddingBottom: 50,
              marginTop: mobile ? 0 : 50
            }}
          >
            <Fade triggerOnce>
              <p style={{ textAlign: 'center', fontSize: 22, letterSpacing: 2 }}>Sign In</p>
            </Fade>
            <Fade delay={2000} triggerOnce>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: mobile ? 14 : 15,
                  marginTop: -15,
                  color: 'grey'
                }}>
                Welcome back
              </p>
            </Fade>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              wrapperCol={{}}
              name="basic"
              onFinish={onFinish}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Form.Item
                label=<span style={{ fontSize: 15, color: 'white' }}>Email</span>
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'The input is not valid email!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label=<span style={{ fontSize: 15, color: 'white' }}>Password</span>
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <p style={{ textAlign: 'center', fontSize: 15 }}>Don't have an account?{' '}
                <a href='/register'>Register</a>
              </p>

              <Form.Item style={{ float: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className='glow-on-hover'
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Fade>
      </div>
    </ConfigProvider>
  );
};

export default SignIn;
