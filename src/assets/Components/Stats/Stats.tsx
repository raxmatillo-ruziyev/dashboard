import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { Pie, Column, PieConfig, ColumnConfig } from '@ant-design/charts';
import './Stats.scss';
import user from '../../../../public/images/user.svg';
import user2 from '../../../../public/images/user2.svg';
import user3 from '../../../../public/images/user3.svg';
import user4 from '../../../../public/images/user4.svg';
import user5 from '../../../../public/images/user5.svg';

const Stats: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=100')
            .then(res => res.json())
            .then(data => {
                setUsers(data.results);
                setLoading(false);
            });
    }, []);

    const getRandomDate = () => {
        const today = new Date();
        const randomDaysAgo = Math.floor(Math.random() * 30);
        const date = new Date(today);
        date.setDate(today.getDate() - randomDaysAgo);
        return date;
    };

    const today = new Date();
    const newUsers = users.filter(() => {
        const regDate = getRandomDate();
        const diffTime = today.getTime() - regDate.getTime();
        return diffTime / (1000 * 60 * 60 * 24) <= 7;
    });

    const statisticData = [
        { title: 'Umumiy foydalanuvchilar', value: users.length, img: user },
        { title: 'Yangi foydalanuvchilar', value: newUsers.length, img: user2 },
        { title: 'Umumiy generatsiyalar', value: users.length * 10, img: user3 },
        { title: 'Umumiy tushum (sum)', value: users.length * 5000, img: user4 },
        { title: 'Bugungi tushum (sum)', value: users.length * 100, img: user5 },
    ];

    const pieConfig: PieConfig = {
        data: [
            { type: 'Ghible 1', value: 27 },
            { type: 'Ghible 2', value: 25 },
            { type: 'Ghible 3', value: 18 },
            { type: 'Ghible 4', value: 15 },
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'Generatsiya',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 18,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    const pieConfig2: PieConfig = {
        ...pieConfig,
        data: [
            { type: 'Free ', value: 35 },
            { type: 'Plus ', value: 30 },
            { type: 'Standart ', value: 20 },
            { type: 'Premium', value: 15 },
        ],
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'Obunalar',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 18,
                    fontStyle: 'bold',
                },
            },
        ],
    };

    const columnData = Array.from({ length: 7 }).map((_, i) => {
        const day = new Date();
        day.setDate(day.getDate() - i);
        return {
            month: day.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short' }),
            value: Math.floor(Math.random() * 100),
        };
    }).reverse();

    const columnData2 = Array.from({ length: 7 }).map((_, i) => {
        const day = new Date();
        day.setDate(day.getDate() - i);
        return {
            month: day.toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short' }),
            value: Math.floor(Math.random() * 100),
        };
    }).reverse();

    const columnConfig: ColumnConfig = {
        data: columnData,
        xField: 'month',
        yField: 'value',
        columnWidthRatio: 0.6,
        color: '#9254de',
        label: {
            position: 'top',
            style: {
                fill: '#000',
                fontSize: 14,
                fontWeight: 600,
            },
            content: (originData: any) => `${originData.value}`,
        },
    };

    const columnConfig2: ColumnConfig = {
        ...columnConfig,
        data: columnData2,
    };

    if (loading) return <div>Yuklanmoqda...</div>;

    return (
        <div className="stats">
            <h1 className='stats-title'>Statistika</h1>

            <Row className='stats-top'>
                {statisticData.map((item, idx) => (
                    <Col className='stats-top-card' key={idx}>
                        <Card style={{ border: "1px solid #00000059" }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <div style={{ fontSize: 13, color: '#999' }}>{item.title}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "10px" }}>
                                    <div style={{ fontSize: 19, fontWeight: 600 }}>{item.value}</div>
                                    {item.img && (
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            style={{ width: 29, height: 29, objectFit: 'contain' }}
                                        />
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={12}>
                    <Card title="Generatsiyalar turi" style={{ borderRadius: "10px 0 0px 10px", border: "1px solid #00000059" }}>
                        <Pie {...pieConfig} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Obuna turi" style={{ borderRadius: "0 10px 10px 0px", border: "1px solid #00000059" }}>
                        <Pie {...pieConfig2} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={24}>
                    <Card title="Kunlik yangi foydalanuvchilar" style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0", border: "1px solid #00000059" }}>
                        <Column {...columnConfig} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={24}>
                    <Card title="Kunlik yangi to‘lovlar" style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0", border: "1px solid #00000059" }}>
                        <Column {...columnConfig2} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Stats;
