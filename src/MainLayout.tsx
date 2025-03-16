import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

import MenuCollapsable from './components/MenuCollapsable';

import './xau.css';

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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ borderRadius: 15 }}>
      <Sider
        style={{ paddingTop: 50}}
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
      <Layout >
        <Header className='dark-primary' style={{ display: 'flex', alignItems: 'center', position: 'sticky' }}>
          <p style={{ fontSize: 35, color: 'white', fontFamily: 'monospace' }}>xau-xau</p>
        </Header>
        <Breadcrumb
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
          style={{ margin: '16px 0', paddingLeft: 10 }}
        />
        <Content style={{ margin: '24px 16px 0', minHeight: '100vh' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer className='dark-primary' style={{ textAlign: 'center', color: 'white' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
