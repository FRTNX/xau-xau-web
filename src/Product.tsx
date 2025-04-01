import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Carousel, Col, Row } from 'antd';

import { EditFilled, EditOutlined } from '@ant-design/icons';
import { MdLocationCity } from 'react-icons/md';
import { MdLocationPin } from 'react-icons/md';

import { formatPrice } from './utils';
import { fetchProduct } from './api/product.api';

import config from './config/config';

const baseUrl = `${config.baseUrl}/api/v0/product/image`;

const Product = () => {
  const { id } = useParams();
  const mobile = window.innerWidth < 500;

  const [data, setData] = useState({
    _id: '',
    owner: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    images: [],
    currency: '',
    status: '',
    contactMethod: '',
    location: '',
    created: '',
    email: '',
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await fetchProduct(id);
    console.log('got product:', result)
    setData(result)
  }

  const EditButton = () => {
    return (
      <div style={{ float: 'right', paddingLeft: 10, marginTop: -4 }}>
        <button
          style={{ background: 'black', padding: mobile ? 7 : 10, fontSize: mobile ? 10 : 15, color: 'rgb(249, 249, 249)' }}
          onClick={() => window.location.href = `/edit/product/${id}`}
        >
          <EditFilled />
        </button>
      </div>
    )
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={15}>
            <Carousel arrows infinite={false} autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
              {
                data.images.map((file, index) => (
                  <div key={index}>
                    <img
                      src={baseUrl + `?id=${id}&&index=${index}`}
                      width={'100%'}
                      height={mobile ? 400 : 600}
                      style={{ objectFit: 'cover', borderRadius: 10 }} />
                  </div>
                ))
              }
            </Carousel>
            <div>
              <div style={{  marginTop: -10 }}>
                <p style={{ display: 'inline-block', fontSize: mobile ? 18 : 25 }}>{data.name}</p>
                <p style={{ display: 'inline-block', float: 'right', fontSize: mobile ? 18 : 25 }}>
                  {data.currency}{" "}{formatPrice(data.price)}
                  {
                    !mobile && <EditButton />
                  }
                </p>

              </div>
              <p style={{ lineHeight: 0, fontSize: mobile ? 12 : 15, marginTop: -10, color: 'grey' }}>{'5 days ago'}</p>
              <p style={{ fontSize: mobile ? 15 : 16, color: 'grey', marginTop: 27 }}><MdLocationPin style={{ marginBottom: -2, color: 'green'}} />{data.location}</p>
              <p style={{ fontSize: mobile ? 15 : 16 }}>{data.description}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={9}>
            <div style={{ textAlign: 'center' }}>
              <MdLocationPin size={200} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Product;
