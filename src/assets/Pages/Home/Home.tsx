import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import { CiLogout } from 'react-icons/ci';


const { Header, Sider, Content } = Layout;

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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <ImStatsBars />              ,
              label: <Link to={'/stats'} >Statistikalar</Link>,
              onClick: () => handleMenuClick('/stats'), // Menu itemni tanlaganda navigate qilish
            },
            {
              key: '2',
              icon: <FaUsers />              ,
              label: <Link to={'/users'}>Foydalanuvchilar</Link>,
              onClick: () => handleMenuClick('/users'), // Menu itemni tanlaganda navigate qilish
            },
            {
                key: '3',
                icon: <CiLogout />                ,
                label:  "Log out" ,
                onClick: () => handleMenuClick('/login'), // Menu itemni tanlaganda navigate qilish
              },
          ]}
        />
          <Header style={{ paddingLeft:5}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '19px',
              width: 64,
              height: 64,
              color:"white",
            }}
          />
        </Header>
      </Sider>
     
      <Layout>
      
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
