import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';


import logo from './assets/images/logo.png'
import brand from './assets/images/logo-square.png';

import './xau.css';


// const themeOptions = {
//   dark: {
//     primary: [],
//     secondary: ['#6b7069']
//   }
// }

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const MainLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  if (!localStorage.getItem('user')) {
    window.location.href = '/signin'
  }

  return (
    <Layout style={{ borderRadius: 15, background: 'black' }}>
      <ConfigProvider
        theme={{ algorithm: [theme.darkAlgorithm], token: { colorBgContainer: '#292929', colorPrimary: '#fff', colorBgSolid: '#000' } }}
      >
        <Sider
          style={{ paddingTop: 115 }}
          className='dark-primary'
          breakpoint="lg"
          collapsedWidth="0"
          // collapsed={collapsed}
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            className='dark-primary'
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          items={items2}
          />
        </Sider>
        <Layout style={{}}>
          <Header className='dark-primary' style={{ display: 'flex', alignItems: 'center', height: 111 }}>
            <div style={{ marginTop: 'auto' }} onClick={() => window.location.href = '/'}>
              <img src={logo} height={'100%'} />
            </div>
            <p>{JSON.parse(localStorage.getItem('user')).username}</p>
            <p style={{ paddingLeft: 20 }}><a href={'/new/product'} style={{ color: 'white' }}>Sell</a></p>
          </Header>
          <div className='dark-primary' style={{ borderRadius: 0 }}>
            <Breadcrumb
              items={[{ title: 'Home' }, { title: 'New' }, { title: 'Product' }]}
              style={{ margin: '16px 0', paddingLeft: 10, color: 'grey' }}
            />
            <Content style={{ margin: '24px 16px 0', minHeight: '100vh' }}>
              <div
                className='dark-secondary'
                style={{
                  padding: 24,
                  minHeight: 360,
                  // background: colorBgContainer,
                  borderRadius: 10,
                }}
              >
                {children}
                <div style={{ textAlign: 'center', paddingTop: 100 }}>
                  <img src={brand} width={200} style={{ borderRadius: '50%' }} />
                </div>
              </div>
            </Content>
          </div>
          <Footer className='dark-primary' style={{ textAlign: 'center', color: 'white' }}>
            Xau-Xau ©{new Date().getFullYear()} Zugzwang Pvt Ltd
          </Footer>
        </Layout>
      </ConfigProvider>
    </Layout>
  );
};

export default MainLayout;
