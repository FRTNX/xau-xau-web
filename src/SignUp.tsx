// @ts-nocheck
import React, { useState } from 'react';
import { Form, Input, Button, ConfigProvider, theme, message } from 'antd';
import { Fade } from 'react-awesome-reveal';

import { createUser } from './api/api';
import auth from './auth/auth-helper';

import "./components/fancy-buttons/hover.glow.css";

const SignUp = () => {
  const mobile = window.innerWidth < 500;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const result = await createUser(values);
    console.log('user creation result:', result)

    // todo return jwt then authenticate
    if (result && result.token) {
      auth.authenticate(result)
      message.success('Sign up successful!');
      window.location.href = '/'
    }
    else {
      message.success('Registration failed.');
    }
  };

  return (
    <ConfigProvider
    // theme={{ algorithm: [theme.darkAlgorithm], token: { colorBgContainer: '#292929' } }}
    >
      <div style={{ minHeight: '100vh' }}>
        <Fade direction='up' triggerOnce>
          <div
            style={{
              maxWidth: mobile ? 400 : 450,
              marginLeft: 'auto',
              marginRight: 'auto',
              background: 'black',
              padding: 10,
              borderRadius: 5,
              paddingBottom: 50,
              marginTop: mobile ? 0 : 50
            }}
          >
            <Fade delay={1500} triggerOnce>
              <p style={{ textAlign: 'center', fontSize: 22, letterSpacing: 2 }}>Register</p>
            </Fade>
            <Fade delay={3500} triggerOnce>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: mobile ? 14 : 15,
                  marginTop: -15,
                  color: 'grey'
                }}>
                And join Zimbabwe's largest online marketplace.
              </p>
            </Fade>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="basic"
              onFinish={onFinish}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Form.Item
                label=<span style={{ fontSize: 15, color: 'white' }}>Name</span>
                name="username"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input />
              </Form.Item>

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

              <Form.Item
                label=<span style={{ fontSize: 15, color: 'white' }}>Confirm</span>
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <p style={{ textAlign: 'center', fontSize: mobile ? 14 : 15, }}>
                Already have an account?{' '}
                <a href='/signin'>Sign in</a>
              </p>
              <Form.Item style={{ float: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className='glow-on-hover'             
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Fade>
      </div>
    </ConfigProvider>
  );
};

export default SignUp;
