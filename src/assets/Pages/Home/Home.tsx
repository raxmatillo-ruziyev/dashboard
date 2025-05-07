import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import './Home.scss';
import logo from '../../../../public/images/logo.svg';
import stats from '../../../../public/images/stats.svg'
import users from '../../../../public/images/users.svg'
import pay from '../../../../public/images/payhistory.svg'

const {  Sider, Content, Footer } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    {
      key: '2',
      icon: <img src={stats} alt="Ghibli Icon" style={{ width: 20, height: 20 }} />,
      label: <Link to={'/home/stats'}>Statistikalar</Link>,
      onClick: () => handleMenuClick('/home/stats'),
    },
    {
      key: '3',
      icon: <img src={users} alt="Ghibli Icon" style={{ width: 20, height: 20 }} />,
      label: <Link to={'/home/users'}>Foydalanuvchilar</Link>,
      onClick: () => handleMenuClick('/home/users'),
    },
    {
      key: '6',
      icon: <img src={pay} alt="Ghibli Icon" style={{ width: 20, height: 20 }} />,
      label: <Link to={'/home/users'}>To'lov tarixi</Link>,
      onClick: () => handleMenuClick('/home/users'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          padding:"0px 5px ",
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Yuqoridagi Logo va Bot nomi */}
        <Menu
          theme="dark"
          mode="inline"
          style={{ borderBottom: '1px solid white' }}
          items={[
            {
              key: '1',
              icon: <img src={logo} alt="Ghibli Icon" style={{ width: 20, height: 20 }} />,
              label: <Link to={'/home/stats'}>Ghibli Bot</Link>,
              onClick: () => handleMenuClick('/home'),
            },
          ]}
        />

        {/* Menu Items */}
        <Menu
          style={{ height: '70vh' }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />

        {/* Pastki Logout va Collapse */}
        <Menu
          theme="dark"
          mode="inline"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
          items={[
            {
              key: '4',
              icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
              label: collapsed ? 'Expand' : 'Collapse',
              onClick: () => setCollapsed(!collapsed),
            },
            {
              key: '5',
              icon: <CiLogout />,
              label: 'Log out',
              onClick: () => {
                localStorage.removeItem('user');
                handleMenuClick('/');
              },
            },
          ]}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, background: "#001529" }}>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} MChJ "BUXORA NATURAL PRODUCT". Barcha huquqlar himoyalangan.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
