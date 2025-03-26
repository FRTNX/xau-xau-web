import { useState } from 'react';
import { Col, Row, Space } from 'antd';
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateData = (params, variation = 10, rows = 10) => {
  const d = [];
  let minValue = 0;
  let maxValue = variation;
  for (let i = 0; i < rows; i++) {
    const datapoint = {};
    params.map((param) =>
      datapoint[param] = random(minValue, maxValue)
    )
    d.push(datapoint)
    minValue += 1;
    maxValue += 1;
  }
  return d;
};

const AdsDashboard = () => {
  const mobile = window.innerWidth < 500;

  return (
    <>
      <Row style={{ width: '100%' }} gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
        <Col style={{ width: '50%' }}>
          <p>Your Ads</p>
          <Space.Compact
            style={{ width: '100%', border: '2px solid black', borderRadius: 10, height: 300}}
            >
            <div style={{ width: '70%', borderRight: '2px solid black'}}>
              Ad card
            </div>
            <div>
              Ad stats
            </div>
          </Space.Compact>
          <div style={{ padding: 10}}/>
          <Space.Compact style={{ width: '100%', border: '2px solid black', borderRadius: 10, height: 300}}>
            <div style={{ width: '70%', borderRight: '2px solid black'}}>
              Ad card
            </div>
            <div>
              Ad stats
            </div>
          </Space.Compact>
        </Col>
        <Col style={{ width: '50%' }}>
          <p>Views Chart</p>
          <AreaChart width={mobile ? (window.innerWidth - 30) : 700} height={300} data={generateData(['name', 'pv', 'uv'])} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="name" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="uv" stroke="#fff" fill='#fff' yAxisId={0} />
            <Area type="monotone" dataKey="pv" stroke="#6f5e08" fill='#6f5e08' yAxisId={1} />
            <Legend />
          </AreaChart>
        </Col>
      </Row>
    </>
  )
}

export default AdsDashboard;