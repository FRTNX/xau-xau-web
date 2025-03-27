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

import Example from './components/charts/RadialBarChart';

import defaultImg from './assets/images/1.jpg';

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

  const [ads, setAds] = useState([
    {
      image: '',
      views: 0,
    },
    {
      image: '',
      views: 0,
    },
  ])

  return (
    <>
      <Row style={{ width: '100%' }} gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
        <Col style={{ width: '50%' }}>
          <p>Your Ads</p>
        
          {
            ads.map((ad, index) => (
              <div>
                <Space.Compact
                  style={{ width: '100%', border: '2px solid black', borderRadius: 10, height: 300 }}
                >
                  <div style={{ width: '70%', borderRight: '2px solid black' }}>
                    Ad card
                  </div>
                  <div>
                    Ad stats
                    <Example />
                  </div>
                </Space.Compact>
                <div style={{ padding: 10 }} />
              </div>
            ))
          }
        </Col>
        <Col style={{ width: '50%' }}>
        <div style={{ display: 'inline-block', float: 'right'}}>
            <button style={{ background: 'black'}}>New Ad</button>
          </div>
          <AreaChart width={mobile ? (window.innerWidth - 30) : 650} height={300} data={generateData(['name', 'pv', 'uv'])} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
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