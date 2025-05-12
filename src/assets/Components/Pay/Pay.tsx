import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './Pay.scss';

interface PayRecord {
  key: string;
  fullName: string;
  email: string;
  amount: number;
  date: string;
  method: string;
}

const Pay: React.FC = () => {
  const [data, setData] = useState<PayRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bu yerda haqiqiy API dan fetch qilish mumkin
    const fetchData = async () => {
      const mockData: PayRecord[] = Array.from({ length: 10 }).map((_, idx) => ({
        key: String(idx),
        fullName: `Foydalanuvchi ${idx + 1}`,
        email: `user${idx + 1}@example.com`,
        amount: Math.floor(Math.random() * 100000),
        date: new Date(Date.now() - idx * 86400000).toLocaleDateString(),
        method: idx % 2 === 0 ? 'Click' : 'Payme',
      }));
      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns: ColumnsType<PayRecord> = [
    {
      title: 'F.I.SH',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'To‘lov miqdori (so‘m)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => amount.toLocaleString('uz-UZ'),
    },
    {
      title: 'Sana',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'To‘lov usuli',
      dataIndex: 'method',
      key: 'method',
    },
  ];

  return (
    <div className="pay-history">
      <Card title="To‘lovlar tarixi" bordered style={{ border: '1px solid #00000059' }}>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default Pay;
