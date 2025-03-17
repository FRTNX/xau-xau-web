import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch } from 'antd';

import defaultImg from './assets/images/1.jpg';
import img2 from './assets/images/2.jpg';

import './xau.css'

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const Section = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [items, setItems] = useState([
    {
      id: '1',
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
    {
      id: '2',
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
    {
      id: '3',
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
    {
      id: '4',
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
  ])

  if (3 < 1) {
    setItems(items)
  }

  useEffect(() => {
    console.log('vanity')
  })

  return (
    <>
      <div style={{ verticalAlign: 'top', width: '100%' }}>
        <p>Electronics</p>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
          {
            items.map((item, index) => (
              <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                <div style={{}} key={index}>
                  <img src={defaultImg} width={'100%'} />
                  <div style={{ lineHeight: 0 }}>
                    <div>
                      <p style={{ display: 'inline-block' }}>{item.name}</p>
                      <p style={{ display: 'inline-block', float: 'right' }}>{item.currency}{" "}{Number(item.price).toFixed(2)}</p>
                    </div>
                    <p>{item.location}</p>
                  </div>
                  <div style={{ float: 'right' }}>
                    <button
                      onClick={() => window.location.href = `/product/${item.id}`}
                    >
                      view
                    </button>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
        <br />
        <br />

        <p>Vehicles</p>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
          {
            items.map((item, index) => (
              <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                <div style={{}} key={index}>
                  <img src={defaultImg} width={'100%'} />
                  <div style={{ lineHeight: 0 }}>
                    <div>
                      <p style={{ display: 'inline-block' }}>{item.name}</p>
                      <p style={{ display: 'inline-block', float: 'right' }}>{item.currency}{" "}{Number(item.price).toFixed(2)}</p>
                    </div>
                    <p>{item.location}</p>
                  </div>
                  <div style={{ float: 'right' }}>
                    <button
                      onClick={() => window.location.href = `/product/${item.id}`}
                    >
                      view
                    </button>
                  </div>
                </div>
               
              </Col>
            ))
          }
        </Row>
       <br />
        <p>Vehicles</p>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
          {
            items.map((item, index) => (
              <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                <div style={{}} key={index}>
                  <img src={img2} width={'100%'} />
                  <div style={{ lineHeight: 0 }}>
                    <div>
                      <p style={{ display: 'inline-block' }}>{item.name}</p>
                      <p style={{ display: 'inline-block', float: 'right' }}>{item.currency}{" "}{Number(item.price).toFixed(2)}</p>
                    </div>
                    <p>{item.location}</p>
                  </div>
                  <div style={{ float: 'right' }}>
                    <button
                      onClick={() => window.location.href = `/product/${item.id}`}
                    >
                      view
                    </button>
                  </div>
                </div>
               
              </Col>
            ))
          }
        </Row>
      </div >
    </>
  )
}

const Home = () => {

  return (
    <Section />
  )
}

export default Home;
