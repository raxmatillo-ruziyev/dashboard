import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  message,
  Descriptions,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import './Users.scss';
import addbtn from '../../../../public/images/addbtn.svg';

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
  const [viewUserModalVisible, setViewUserModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [viewingUser, setViewingUser] = useState<UserType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((user: any) => ({
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
      .catch(() => message.error('Maʼlumotlarni yuklashda xatolik!'))
      .finally(() => setLoading(false));
  };

  const handleMenuClick = (action: string, record: UserType) => {
    switch (action) {
      case 'view':
        setViewingUser(record);
        setViewUserModalVisible(true);
        break;
      case 'edit':
        setEditingUser(record);
        form.setFieldsValue({
          name: record.name,
          username: record.username,
          email: record.email,
          phone: record.phone,
          website: record.website,
          city: record.address.city,
        });
        setIsModalOpen(true);
        break;
      case 'delete':
        Modal.confirm({
          title: 'Haqiqatan o‘chirmoqchimisiz?',
          content: record.name,
          okText: 'Ha',
          cancelText: 'Yo‘q',
          onOk: () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${record.key}`, {
              method: 'DELETE',
            })
              .then(() => {
                message.success('Foydalanuvchi o‘chirildi');
                setUsers((prev) =>
                  prev.filter((user) => user.key !== record.key)
                );
              })
              .catch(() => message.error('O‘chirishda xatolik yuz berdi'));
          },
        });
        break;
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
        // Edit user
        fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.key}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            message.success('Foydalanuvchi tahrirlandi');
            setUsers((prev) =>
              prev.map((user) =>
                user.key === editingUser.key ? { ...data, key: editingUser.key } : user
              )
            );
            setIsModalOpen(false);
            form.resetFields();
          })
          .catch(() => message.error('Tahrirlashda xatolik'));
      } else {
        // Add user
        const newKey = Math.max(...users.map((u) => u.key), 0) + 1;
        fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => {
            message.success('Yangi foydalanuvchi qo‘shildi');
            setUsers((prev) => [...prev, { ...data, key: newKey }]);
            setIsModalOpen(false);
            form.resetFields();
          })
          .catch(() => message.error('Qo‘shishda xatolik'));
      }
    });
  };

  const columns = [
    { title: '№', dataIndex: 'key', key: 'key' },
    { title: 'Ismi', dataIndex: 'name', key: 'name' },
    { title: 'Foydalanuvchi nomi', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Telefon', dataIndex: 'phone', key: 'phone' },
    { title: 'Shahar', dataIndex: ['address', 'city'], key: 'city' },
    { title: 'Websayt', dataIndex: 'website', key: 'website' },
    {
      title: 'Amallar',
      key: 'actions',
      render: (_: any, record: UserType) => (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              items={[
                { key: 'view', label: 'Ko‘rish', icon: <EyeOutlined /> },
                { key: 'edit', label: 'Tahrirlash', icon: <EditOutlined /> },
                {
                  key: 'delete',
                  label: 'O‘chirish',
                  icon: <DeleteOutlined />,
                  danger: true,
                },
              ]}
            />
          }
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="users-container">
      <div className="users-header">
        <h1 className="users-title">Foydalanuvchilar</h1>
        <Button
          onClick={handleAddNew}
          icon={<img src={addbtn} alt="Qo‘shish" />}
          style={{ marginBottom: 16, border: '1px solid orange' }}
        />
      </div>

      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingUser ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
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
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
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

      {/* View Modal */}
      <Modal
        title="Foydalanuvchi ma’lumotlari"
        open={viewUserModalVisible}
        onCancel={() => setViewUserModalVisible(false)}
        footer={null}
      >
        {viewingUser && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Ismi">{viewingUser.name}</Descriptions.Item>
            <Descriptions.Item label="Username">{viewingUser.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{viewingUser.email}</Descriptions.Item>
            <Descriptions.Item label="Telefon">{viewingUser.phone}</Descriptions.Item>
            <Descriptions.Item label="Shahar">{viewingUser.address.city}</Descriptions.Item>
            <Descriptions.Item label="Websayt">{viewingUser.website}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Users;
