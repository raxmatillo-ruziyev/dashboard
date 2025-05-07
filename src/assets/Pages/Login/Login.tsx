import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import logo from '../../../../public/images/logo.svg';

const Login: React.FC = () => {
  const navigate = useNavigate(); // Navigatsiya qilish uchun hook
  const [loading, _] = useState(false);

  const onFinish = (values: any) => {
    const { username, password } = values;
  
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('user', JSON.stringify({ username, password }));
      navigate('/home/stats');
    } else {
      alert('Foydalanuvchi nomi yoki parol noto‘g‘ri');
    }
  };
  

  return (
    <div className='login'>
      <div className='login-wrap'>
        <div className='login-box'>
          <div className='login-inner'>
            <img className='login-logo' src={logo} alt="" />
            <h2 className='login-subtitle'>Dashboard</h2>
          </div>
          <Form
            name="login-form"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <h2 className="login-title">Xush kelibsiz</h2>
            <p className='login-text'>Davom etish uchun tizimga kiring</p>

            <Form.Item
              label="Foydalanuvchi nomi"
              name="username"
              rules={[{ required: true, message: 'Iltimos foydalanuvchi nomini kiriting!' }]}
            >
              <Input placeholder="Usernameni kiriting" />
            </Form.Item>

            <Form.Item
              label="Foydalanuvchi paroli"
              name="password"
              rules={[{ required: true, message: 'Iltimos foydalanuvchi parolini kiriting!' }]}
            >
              <Input.Password placeholder="Parolini kiriting" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="login-button"
                loading={loading}
              >
                Tizimga kirish
              </Button>
            </Form.Item>

          </Form>
          <div>
            <img className='login-img' src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
