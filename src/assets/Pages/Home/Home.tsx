import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {  Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import { CiLogout } from 'react-icons/ci';


const {  Sider, Content } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // useNavigate hook-ni chaqiramiz

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (path: string) => {
    // Menu item ni tanlaganida bu funksiya ishlaydi
    navigate(path);
  };

  return (
    <Layout>
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}
        items={[
          {
            key: '1',
            icon: <ImStatsBars />,
            label: <Link to={'/home/stats'}>Statistikalar</Link>,
            onClick: () => handleMenuClick('/home/stats'),
          },
          {
            key: '2',
            icon: <FaUsers />,
            label: <Link to={'/home/users'}>Foydalanuvchilar</Link>,
            onClick: () => handleMenuClick('/home/users'),
          },
          {
            key: '4',
            icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
            label: collapsed ? 'Expand' : 'Collapse',
            onClick: () => setCollapsed(!collapsed),
          },
          {
            key: '3',
            icon: <CiLogout />,
            label: 'Log out',
            onClick: () => handleMenuClick('/'),
          },
        ]}
      />
    </Sider>

    <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
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
    </Layout>
  </Layout>
  );
};

export default Home;
