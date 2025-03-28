import { useState } from 'react';
import { Col, Row, Space, Select } from 'antd';
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  AreaChart,
  ResponsiveContainer,
  Area,
  Legend
} from 'recharts';

import Example from './components/charts/RadialBarChart';

import defaultImg from './assets/images/1.jpg';
import img2 from './assets/images/2.jpg';

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
      image: defaultImg,
      views: 0,
    },
    {
      image: img2,
      views: 0,
    },
    {
      image: img2,
      views: 0,
    },
  ])

  return (
    <>
      <Row style={{ width: '100%' }} gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
        <Col style={{ width: mobile ? '100%' : '50%' }}>
          <Space.Compact style={{ float: 'right', paddingBottom: 10 }}>
            <div
              style={{
                border: '2px solid rgb(0, 0, 0)',
                height: 32,
                padding: 5,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                background: 'black'
                }}>
              <span>Filter</span>
            </div>
            <Select
              defaultValue="active"
              style={{ width: 120 }}
              // onChange={handleChange}
              options={[
                { value: 'active', label: 'ACTIVE' },
                { value: 'dormant', label: 'DORMANT' },
                { value: 'all', label: 'ALL' },
              ]}
            />
          </Space.Compact>
          {
            ads.map((ad, index) => (
              <div>
                <Space.Compact
                  style={{ width: '100%', border: '0px solid black', borderRadius: 10, height: 300 }}
                >
                  <div style={{ width: '70%' }}>
                    <img
                      src={ad.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10
                      }} />
                  </div>
                  <div style={{ background: 'black', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                    <p
                      style={{ lineHeight: 0, paddingLeft: 5, color: '#fff', fontSize: 15, fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: 5 }}
                    >views</p>
                    <Example />
                  </div>
                </Space.Compact>
                <div style={{ padding: 10 }} />
              </div>
            ))
          }
        </Col>
        <Col style={{ width: mobile ? '100%' : '50%' }}>
        <Space wrap style={{ float: 'right', paddingBottom: 10 }}>
            <div style={{ display: 'inline-block', float: 'right', paddingBottom: 0 }}>
              <button
                onClick={() => window.location.href = '/advertisers/new/ad'}
                style={{ background: 'black' }}
              >Create a New Ad</button>
            </div>
          </Space>
          <p style={{ fontSize: 18, lineHeight: 0, fontFamily: 'monospace', paddingBottom: 0}}></p>
          <ResponsiveContainer height={300} width={'100%'} style={{ }}>
            <AreaChart data={generateData(['name', 'pv', 'uv'])} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Area type="monotone" dataKey="uv" stroke="#fff" fill='#fff' yAxisId={0} />
              <Area type="monotone" dataKey="pv" stroke="#6f5e08" fill='#6f5e08' yAxisId={1} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>

        </Col>
      </Row>
    </>
  )
}

export default AdsDashboard;