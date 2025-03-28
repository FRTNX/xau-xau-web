import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import { TypeAnimation } from 'react-type-animation'

import brand from './assets/images/logo-square.png';
import parent from './assets/images/zugzwang.png';
import './xau.css';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['Home', 'Ads Dashboard', 'Sell Something', '45'].map((key) => ({
  key,
  label: `${key}`,
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

const CRUMB_MAPPER = {
  advertisers: 'Advertisers',
  dashboard: 'Dashboard',
  new: 'New',
  edit: 'Edit',
  product: 'Product'
}

const MainLayout: React.FC = ({ children }) => {
  const mobile = window.innerWidth < 500;
  const [selectedMenuItem, setSelectedMenuItem] = useState('Home');
  const [breadcrumbs, setBreadcrumbs] = useState([
    { title: 'Home' },
    { title: 'New' },
    { title: 'Product' }
  ]);
  useEffect(() => {
    console.log('window location:', window.location.pathname)
    updateBreadcrumbs();
  }, [window.location]);

  const updateBreadcrumbs = () => {
    const pathVariables = window.location.pathname.split('/');
    console.log('path vars:', pathVariables)
    const newCrumbs = [{ title: 'Home' }];
    pathVariables.map((item) => {
      if (Object.keys(CRUMB_MAPPER).includes(item)) {
        newCrumbs.push({ title: CRUMB_MAPPER[item] });
      }
    })
    console.log('created new crumbs:', newCrumbs)
    setBreadcrumbs(newCrumbs);
  }

  if (!localStorage.getItem('user')) {
    window.location.href = '/signin'
  }

  const handleMenuSelect = (event) => {
    console.log('menu click event:', event)
    setSelectedMenuItem(event.key);

    if (event.key === 'Home') {
      window.location.href = '/'
    }
    if (event.key === 'Ads Dashboard') {
      window.location.href = '/advertisers/dashboard'
    }
    if (event.key === 'Sell Something') {
      window.location.href = '/new/product'
    }
  }

  const Logo = () => {
    return (
      <div style={{}}>
        <TypeAnimation
          sequence={[
            "Xau",
            6000,
            'Xau-Xau',
            1000,
            'Xawu-Xawu',
            1000,
          ]}
          preRenderFirstString={true}
          wrapper="span"
          speed={1}
          style={{ fontSize: mobile ? 50 : 65, fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', color: 'white' }}
          repeat={Infinity}
        />
      </div>
    )
  }

  return (
    <Layout style={{ borderRadius: 15, background: 'black' }}>
      <ConfigProvider
        theme={{ algorithm: [theme.darkAlgorithm], token: { colorBgContainer: '#292929', colorPrimary: '#fff', colorBgSolid: '#000' } }}
      >
        {
          !mobile && (
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
                defaultSelectedKeys={[selectedMenuItem]}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items1}
                onClick={handleMenuSelect}
              />
            </Sider>
          )
        }
        <Layout style={{}}>
          <Header className='dark-primary' style={{ paddingLeft: 0, display: 'flex', alignItems: 'center', height: 100 }}>
            <div style={{ marginTop: 'auto', paddingLeft: 20, paddingTop: 5 }} onClick={() => window.location.href = '/'}>
              {/* <img src={logo} height={106} /> */}
              <Logo />
              <p style={{ marginTop: 0, fontSize: 14, lineHeight: 0, color: 'grey' }}>
                Zimbabwe's Leading Classifieds
              </p>
            </div>
            {/* <p>{JSON.parse(localStorage.getItem('user')).username}</p> */}
          </Header>
          <div className='dark-primary' style={{ borderRadius: 0 }}>
            <Breadcrumb
              items={breadcrumbs}
              style={{ margin: '16px 0', paddingLeft: 20, color: 'white' }}
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
            ©{new Date().getFullYear()} Xau-Xaw
            <div style={{ height: 10 }} />
            <span style={{}}>Made with ❤️ by
              <img src={parent} height={23} onClick={() => window.location.href = 'https://zugzwang.co.zw'} style={{ verticalAlign: 'bottom' }} /></span>
          </Footer>
        </Layout>
      </ConfigProvider>
    </Layout>
  );
};

export default MainLayout;
