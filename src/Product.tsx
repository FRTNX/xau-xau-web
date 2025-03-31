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
    _id: '67e27f0146e9aad23bfda25c',
    owner: '67de7d13f87fe73317c39edc',
    name: 'Item Title',
    description: 'Item Description.',
    category: 'computers',
    price: 7,
    images: [],
    currency: 'USD$',
    status: 'AV',
    contactMethod: 'MAIL',
    location: 'Bulawayo',
    created: '2025-03 - 25T10:01: 37.555Z',
    email: 'frtnx@email.com',
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
          style={{ background: 'black', padding: 10, fontSize: 15, color: 'rgb(249, 249, 249)' }}
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
              <div style={{ fontSize: 28 }}>
                <p style={{ display: 'inline-block' }}>{data.name}</p>
                <p style={{ display: 'inline-block', float: 'right' }}>
                  {data.currency}{" "}{formatPrice(data.price)}
                  <EditButton />
                </p>

              </div>
              <p style={{ lineHeight: 0, fontSize: 18 }}>{data.created}</p>
              <p style={{ fontSize: 18 }}>{data.location}</p>
              <p style={{ fontSize: 16 }}>{data.description}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={9}>
           <div style={{ textAlign: 'center' }}>
            <MdLocationPin size={200}/>
           </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Product;
