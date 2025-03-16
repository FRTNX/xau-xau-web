import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch } from 'antd';

import defaultImg from './assets/images/1.jpg';
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
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
    {
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
    {
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
    {
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
                    >
                      view
                    </button>
                  </div>
                </div>
                {/* <Card
                  style={{ width: '100%' }}
                  cover={
                    <img
                      alt="example"
                      src={defaultImg}
                    />
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" style={{ color: 'black', fontSize: 20 }} />,
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar src={defaultImg} />}
                    title="Acer Laptop"
                    description="This is the description"
                  />
                </Card> */}
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
