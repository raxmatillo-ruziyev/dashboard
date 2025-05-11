import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown, Menu, Modal, Form, Input, message } from 'antd';

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import './Users.scss';
import addbtn from '../../../../public/images/addbtn.svg'

interface UserType {
  key: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [form] = Form.useForm();
  const [viewUserModalVisible, setViewUserModalVisible] = useState(false);
const [viewingUser, setViewingUser] = useState<UserType | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((user: any, index: number) => ({
          key: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          address: { city: user.address.city },
        }));
        setUsers(formatted);
      })
      .catch((err) => console.error('Xatolik:', err))
      .finally(() => setLoading(false));
  };

  const handleMenuClick = (action: string, record: UserType) => {
    if (action === 'view') {
       setViewingUser(record);
  setViewUserModalVisible(true);
  Modal.info({
    title: 'Foydalanuvchi ma’lumotlari',
    content: (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{border:"1px solid black", padding: '8px', fontWeight: 'bold' }}>Ism:</td>
            <td style={{border:"1px solid black", padding: '8px' }}>{record.name}</td>
          </tr>
          <tr>
            <td style={{border:"1px solid black", padding: '8px', fontWeight: 'bold' }}>Username:</td>
            <td style={{border:"1px solid black", padding: '8px' }}>{record.username}</td>
          </tr>
          <tr>
            <td style={{border:"1px solid black", padding: '8px', fontWeight: 'bold' }}>Email:</td>
            <td style={{border:"1px solid black", padding: '8px' }}>{record.email}</td>
          </tr>
          <tr>
            <td style={{border:"1px solid black", padding: '8px', fontWeight: 'bold' }}>Telefon:</td>
            <td style={{border:"1px solid black", padding: '8px' }}>{record.phone}</td>
          </tr>
          <tr>
            <td style={{border:"1px solid black", padding: '8px', fontWeight: 'bold' }}>Shahar:</td>
            <td style={{border:"1px solid black", padding: '8px' }}>{record.address.city}</td>
          </tr>
          <tr>
            <td style={{border:"1px solid black", padding: '8px', fontWeight: 'bold' }}>Websayt:</td>
            <td style={{border:"1px solid black", padding: '8px' }}>{record.website}</td>
          </tr>
        </tbody>
      </table>
    ),
  });
  
    } else if (action === 'edit') {
      setEditingUser(record);
      form.setFieldsValue({
        name: record.name,
        username: record.username,
        email: record.email,
        phone: record.phone,
        city: record.address.city,
        website: record.website,
      });
      setIsModalOpen(true);
    } else if (action === 'delete') {
      Modal.confirm({
        title: 'O‘chirishni xohlaysizmi?',
        content: record.name,
        onOk: () => {
          // DELETE so‘rovi
          fetch(`https://jsonplaceholder.typicode.com/users/${record.key}`, {
            method: 'DELETE',
          })
            .then(() => {
              message.success('O‘chirildi');
              setUsers((prev) => prev.filter((u) => u.key !== record.key));
            })
            .catch(() => message.error('Xatolik yuz berdi'));
        },
      });
    }
  };

  const handleAddNew = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = {
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        website: values.website,
        address: { city: values.city },
      };

      if (editingUser) {
        // PUT (Tahrirlash)
        fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.key}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            message.success('Tahrirlandi');
            setUsers((prev) =>
              prev.map((user) => (user.key === editingUser.key ? { ...data, key: editingUser.key } : user))
            );
            setIsModalOpen(false);
          });
      } else {
        // POST (Yangi qo‘shish)
        fetch(`https://jsonplaceholder.typicode.com/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            message.success('Qo‘shildi');
            setUsers((prev) => [...prev, { ...data, key: Date.now() }]);
            setIsModalOpen(false);
          });
      }
    });
  };

  const columns = [
    {
      title: '№',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Ismi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Foydalanuvchi nomi',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Shahar',
      dataIndex: ['address', 'city'],
      key: 'city',
    },
    {
      title: 'Websayt',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Amallar',
      key: 'actions',
      render: (_: any, record: UserType) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleMenuClick(key, record)}
            items={[
              {
                key: 'view',
                label: 'Ko‘rish',
                icon: <EyeOutlined />,
              },
              {
                key: 'edit',
                label: 'Tahrirlash',
                icon: <EditOutlined />,
              },
              {
                key: 'delete',
                label: 'O‘chirish',
                icon: <DeleteOutlined />,
                danger: true,
              },
            ]}
          />
        );
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="users-container">
     <div 
     style={{
      display:"flex",
      justifyContent:"space-between"
     }}>
     <h1 className='users-title'>Foydalanuvchilar</h1>
      <Button
        onClick={handleAddNew}
        style={{ marginBottom: 16 ,
          border:"1px solid orange"
        }}
      ><img src={addbtn} alt="" />
      </Button>
     </div>

      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />

      <Modal
        title={editingUser ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText={editingUser ? 'Saqlash' : 'Qo‘shish'}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Ismi" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telefon" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="Shahar" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Websayt" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
