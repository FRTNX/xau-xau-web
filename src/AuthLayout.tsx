// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import { TypeAnimation } from 'react-type-animation';

import { MenuOutlined } from '@ant-design/icons';
import { MdWorkspaces, MdBarChart, MdUpcoming } from 'react-icons/md';
import { DollarCircleOutlined } from '@ant-design/icons';
import { PieChartOutlined } from '@ant-design/icons';

import brand from './assets/images/logo-square.png';
import parent from './assets/images/zugzwang.png';
import './xau.css';

const { Header, Content, Footer, Sider } = Layout;


// todo: change options based on whether user is logged in as well
// as type of user account
const items1: MenuProps['items'] = [
  [<MdWorkspaces />, 'Home'],
  [<PieChartOutlined />, 'Ads Dashboard'],
  [<DollarCircleOutlined />, 'Sell Something'],
  [<MdBarChart />, 'Your Products'],
  [<MdUpcoming />, 'Auctions']
].map((key) => ({
  key: key[1],
  icon: key[0],
  label: `${key[1]}`,
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
  product: 'Product',
  signin: 'Welcome Back',
  register: 'Welcome',
  ad: 'Ad'
}

const MainLayout: React.FC = ({ children }) => {
  const mobile = window.innerWidth < 500;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(mobile ? true : false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Home');
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    updateBreadcrumbs();
  }, [window.location]);

  const menuMapper = () => {
    const path = window.location.pathname;
    const homePaths = ['/']
    if (homePaths.includes(path)) {
      return 'Home'
    }
    else if (['/advertisers/dashboard'].includes(path)) {
      return 'Ads Dashboard'
    }

    else if (['/new/product'].includes(path)) {
      return 'Sell Something'
    }

    // unregistered path
    else {
      return ''
    }
  }

  // todo: move to utils
  const equalArrays = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
  }

  const updateBreadcrumbs = () => {
    const pathVariables = window.location.pathname.split('/');
    console.log('path vars:', pathVariables)
    const pathname = window.location.pathname;
    console.log('pathname:', pathname)
    let newCrumbs = [{ title: '' }];
    
    if (equalArrays(pathVariables, ['', ''])) {
      newCrumbs.push({ title: ''}, { title: ''});
    }

    pathVariables.map((item) => {
      if (Object.keys(CRUMB_MAPPER).includes(item)) {
        newCrumbs.push({ title: CRUMB_MAPPER[item] });
      }
    })
    setBreadcrumbs(newCrumbs);
  }

  // if (!localStorage.getItem('user')) {
  //   const pathname = window.location.pathname;
  //   console.log('pathname:', pathname)
  //   const exceptions = ['/signin', '/regiser']
  //   if (!exceptions.includes(pathname)) {
  //     window.location.href = '/signin'
  //   }
  // }

  const toggleSidebar = () => {
    console.log('toggling sidebar')
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    } else {
      setSidebarCollapsed(true);
    }
  }

  const toggleSidebarDesktop = () => {
    if (desktopSidebarCollapsed) {
      setDesktopSidebarCollapsed(false);
    } else {
      setDesktopSidebarCollapsed(true);
    }
  }

  const handleMenuSelect = (event) => {
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
      <div style={{}} onClick={() => window.location.href = '/'}>
        <TypeAnimation
          sequence={[
            "Xau",
            15000,
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
              style={{ paddingTop: 150 }}
              className='dark-primary'
              breakpoint="lg"
              collapsedWidth="50"
              collapsed={desktopSidebarCollapsed}
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
                selectedKeys={[menuMapper()]}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items1}
                onClick={handleMenuSelect}
              />
            </Sider>
          )
        }
        <Layout style={{}}>
          <Header className='dark-primary' style={{ paddingLeft: 0, display: 'flex', alignItems: 'center', height: 130 }}>
            {
              !mobile && (
                <div
                  onClick={toggleSidebarDesktop}
                  style={{ marginTop: -50, paddingLeft: 15, color: 'white', fontSize: 25 }}
                >
                  <MenuOutlined size={30} />
                </div>
              )
            }
            <div style={{ marginTop: 'auto', paddingLeft: 20, paddingTop: 5 }} >
              {
                mobile && (
                  <div
                    onClick={toggleSidebar}
                    style={{ position: 'absolute', right: 30, top: 10, color: 'white', fontSize: 20 }}
                  >
                    <MenuOutlined size={30} />
                  </div>
                )
              }
              <Logo />
              <p style={{ marginTop: 0, fontSize: 14, lineHeight: 0, color: 'grey', paddingBottom: 10 }}>
                Zimbabwe's Leading Classifieds
              </p>
              <Breadcrumb
                items={breadcrumbs}
                style={{ margin: '16px 0', marginLeft: -5, paddingLeft: 0, color: 'white' }}
              />
            </div>
            {/* <p>{JSON.parse(localStorage.getItem('user')).username}</p> */}
          </Header>
          <Layout className='dark-primary' style={{ borderRadius: 0 }}>
            <Content style={{ margin: '24px 16px 0', minHeight: '100vh', filter: mobile && !sidebarCollapsed ? 'blur(6px)' : 'none' }}>
              <div
                className='dark-secondary'
                style={{
                  padding: 24,
                  minHeight: 360,
                  borderRadius: 10,
                }}
              >
                {children}
                <div style={{ textAlign: 'center', paddingTop: 100 }}>
                  <img src={brand} width={200} style={{ borderRadius: '50%' }} />
                </div>
              </div>
            </Content>
            {
              mobile && (
                <Sider
                  style={{ paddingTop: 20 }}
                  className='dark-primary'
                  breakpoint="lg"
                  collapsed={sidebarCollapsed}
                  collapsedWidth="1"
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
                    selectedKeys={[menuMapper()]}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    items={items1}
                    onClick={handleMenuSelect}
                  />
                </Sider>
              )
            }
          </Layout>
          <Footer className='dark-primary' style={{ textAlign: 'center', color: 'white' }}>
            © {new Date().getFullYear()} Xau-Xau
            <div style={{ height: 10 }} />
            <span style={{}}>Made with ❤️ by
              <img
                src={parent}
                height={23}
                onClick={() => window.open('https://zugzwang.co.zw')}
                style={{ verticalAlign: 'bottom', paddingLeft: 3 }}
              /></span>
          </Footer>
        </Layout>
      </ConfigProvider>
    </Layout>
  );
};

export default MainLayout;
