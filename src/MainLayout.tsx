import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';

import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import type { GetProps } from 'antd';


import MenuCollapsable from './components/MenuCollapsable';

import logo from './assets/images/logo.png'
import brand from './assets/images/logo-square.png';

import './xau.css';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const { TextArea } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
  },
];


const themeOptions = {
  dark: {
    primary: [],
    secondary: ['#6b7069']
  }
}

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
        // items={items2}
        />
      </Sider>
      <Layout style={{}}>
        <Header className='dark-primary' style={{ display: 'flex', alignItems: 'center', position: 'sticky', height: 111 }}>
          {/* <p style={{ fontSize: 35, color: 'white', fontFamily: 'monospace' }}>xau-xau</p> */}
          <div style={{ marginTop: 'auto' }} onClick={() => window.location.href = '/'}>
            <img src={logo} height={'100%'} />
          </div>
          {/* <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200, marginLeft: 80, marginTop: 20 }} /> */}
        </Header>
        <div className='dark-primary' style={{ borderRadius: 0 }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
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
              <div style={{ textAlign: 'center', paddingTop: 100}}>
                <img src={brand} width={200} style={{ borderRadius: '50%'}} />
              </div>
            </div>
          </Content>
        </div>
        <Footer className='dark-primary' style={{ textAlign: 'center', color: 'white' }}>
          Xau-Xau ©{new Date().getFullYear()} Zugzwang Pvt Ltd
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
