import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MessageOutlined
} from '@ant-design/icons';
import './Users.scss';

const dataSource = [
  {
    key: '1',
    name: 'Alimov ',
    gender: 'Erkak',
    age: 18,
    region: 'Toshkent ',
    district: 'Nurafshon',
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },
  {
    key: '2',
    name: 'Shafoat',
    gender: 'Ayol',
    age: 41,
    region: "Farg'ona ",
    district: "Beshariq ",
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },
  {
    key: '3',
    name: 'Alimov ',
    gender: 'Erkak',
    age: 18,
    region: 'Toshkent ',
    district: 'Nurafshon',
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },
  {
    key: '4',
    name: 'Shafoat',
    gender: 'Ayol',
    age: 41,
    region: "Farg'ona ",
    district: "Beshariq ",
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },{
    key: '5',
    name: 'Alimov ',
    gender: 'Erkak',
    age: 18,
    region: 'Toshkent ',
    district: 'Nurafshon',
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },
  {
    key: '6',
    name: 'Shafoat',
    gender: 'Ayol',
    age: 41,
    region: "Farg'ona ",
    district: "Beshariq ",
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },
  {
    key: '7',
    name: 'Shafoat',
    gender: 'Ayol',
    age: 41,
    region: "Farg'ona ",
    district: "Beshariq ",
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },
  {
    key: '8',
    name: 'Shafoat',
    gender: 'Ayol',
    age: 41,
    region: "Farg'ona ",
    district: "Beshariq ",
    score: 0,
    date: '2025-04-30',
    status: 'Faol',
  },
  
 
];

const columns = [
  {
    title: '№',
    dataIndex: 'key',
    key: 'key',
    // render: (index) => index + 1,
  },
  {
    title: 'F.I.Sh.',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Jinsi',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Yosh',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Viloyat',
    dataIndex: 'region',
    key: 'region',
  },
  {
    title: 'Tuman',
    dataIndex: 'district',
    key: 'district',
  },
  {
    title: 'Jami ball',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: "Ro'yxatdan o'tgan sana",
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Holati',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color="blue" key={status}>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Amallar',
    key: 'actions',
    render: () => (
      <Space size="middle">
        <Button icon={<EyeOutlined />} type="text" />
        <Button icon={<MessageOutlined />} type="text" />
        <Button icon={<EditOutlined />} type="text" />
        <Button icon={<DeleteOutlined />} type="text" danger />
      </Space>
    ),
  },
];

const Users: React.FC = () => {
  return (
    <div className="users-container">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 8 }}
        bordered
      />
    </div>
  );
};

export default Users;
