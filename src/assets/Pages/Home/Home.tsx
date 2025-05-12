import  { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Home.scss';
import logo from '../../../../public/images/logo.svg';
import stats from '../../../../public/images/stats.svg'
import users from '../../../../public/images/users.svg'
import pay from '../../../../public/images/payhistory.svg'
import logout from '../../../../public/images/logout.svg'
import col from '../../../../public/images/collapsed.svg'

const { Sider, Content } = Layout;

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
      icon: <img src={stats} alt="Ghibli Icon" style={{ width: 23, height: 23 }} />,
      label: <Link to={'/home/stats'}>Statistikalar</Link>,
      onClick: () => handleMenuClick('/home/stats'),
    },
    {
      key: '3',
      icon: <img src={users} alt="Ghibli Icon" style={{ width: 23, height: 23 }} />,
      label: <Link to={'/home/users'}>Foydalanuvchilar</Link>,
      onClick: () => handleMenuClick('/home/users'),
    },
    {
      key: '6',
      icon: <img src={pay} alt="Ghibli Icon" style={{ width: 23, height: 23 }} />,
      label: <Link to={'/home/users'}>To'lov tarixi</Link>,
      onClick: () => handleMenuClick('/home/pay'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          padding: "0px  ",
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
          style={{ padding: "3px" }}
          items={[
            {
              key: 'title',
              disabled: true,
              icon: <img src={logo} alt="Ghibli Icon" style={{ width: 23, height: 23 }} />,
              label: (
                <span style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "white",
                  cursor: "pointer"
                }}>
                  Ghibli Bot
                </span>
              ),
            },
          ]}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: "20px"
          }}>
          <hr
            style={{
              borderRadius: "20px",
              width: "160px"
            }} />

        </div>

        {/* Menu Items */}
        <Menu
          style={{ height: '83vh' }}
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
              key: '5',
              icon: <img src={logout} alt="Ghibli Icon" style={{ width: 23, height: 23 }} />,
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
       <div
       style={{
        display:"flex"
       }}>
        <div 
        style={{
          color:"white",
          width:"30px",
          padding:"50px 0"
        }}>
          <div style={{ padding: '16px', background: '#001529' }}>
  <span
    onClick={() => setCollapsed(!collapsed)}
    style={{
      fontSize: '30px',
      color: '#fff',
      cursor: 'pointer',
    }}
  >
    <img
      src={collapsed ? col : col}
      alt="Toggle"
      style={{ width: 40, height: 50 }}
    />
  </span>
</div>

        </div>
       <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            border:"1px solid #11093B",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
       </div>
      </Layout>
    </Layout>
  );
};

export default Home;
