import React from 'react';
import { Card, Row, Col } from 'antd';
import { Pie, Column } from '@ant-design/charts';
import './Stats.scss';
import user from '../../../../public/images/user.svg'
import user2 from '../../../../public/images/user2.svg'
import user3 from '../../../../public/images/user3.svg'
import user4 from '../../../../public/images/user4.svg'
import user5 from '../../../../public/images/user5.svg'



const Stats: React.FC = () => {
    const statisticData = [
        { title: 'Umumiy foydalanuvchilar', value: 120348, img: user },
        { title: 'Yangi foydalanuvchilar', value: 30369, img: user2 },
        { title: 'Umumiy generatsiyalar', value: 830454, img: user3 },
        { title: 'Umumiy tushum (sum)', value: 281692, img: user4 },
        { title: 'Bugungi tushum (sum)', value: 0, img: user5 },
    ];

    const pieData = [
        { type: 'Ghible       ', value: 12 },
        { type: 'Ghible    ', value: 18 },
        { type: 'Ghible      ', value: 20 },
        { type: 'Ghible', value: 50 },
    ];

    const subData = [
        { type: 'Plus', value: 20 },
        { type: 'Standart', value: 20 },
        { type: 'Premium', value: 10 },
        { type: 'Free', value: 50 },
    ];

    const columnData = [
        { month: 'Jan', value: 100 },
        { month: 'Feb', value: 200 },
        { month: 'Mar', value: 300 },
        { month: 'Apr', value: 400 },
        { month: 'May', value: 500 },
        { month: 'Jun', value: 300 },
        { month: 'Jul', value: 200 },
        { month: 'Aug', value: 100 },
    ];

    const pieConfig = {
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: { type: 'inner', offset: '-50%', content: '{value}', style: { textAlign: 'center', fontSize: 14 } },
        interactions: [{ type: 'element-active' }],
    };

    const pieConfig2 = {
        ...pieConfig,
        data: subData,
    };

    const columnConfig = {
        data: columnData,
        xField: 'month',
        yField: 'value',
        columnWidthRatio: 0.6,
        color: '#9254de',
        label: { position: 'middle', style: { fill: '#fff' } },
    };

    return (
        <div className="stats">
            <Row gutter={[6, 16]}>
                {statisticData.map((item, idx) => (
                    <Col span={4.9} key={idx}>
                        <Card>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <div style={{ fontSize: 12, color: '#999' }}>{item.title}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:"10px" }}>
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
                    <Card title="Generatsiyalar turi">
                        <Pie {...pieConfig} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Obuna turi">
                        <Pie {...pieConfig2} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={24}>
                    <Card title="Kunlik yangi foydalanuvchilar">
                        <Column {...columnConfig} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 24 }}>
                <Col span={24}>
                    <Card title="Kunlik yangi to‘lovlar">
                        <Column {...columnConfig} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Stats;
