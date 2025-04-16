// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Carousel, Col, Row } from 'antd';

import { Input, Form } from 'antd';
import type { GetProps } from 'antd';

import { EditFilled } from '@ant-design/icons';
import { MdLocationPin } from 'react-icons/md';

import { formatPrice } from './utils';
import { fetchProduct, productEmail } from './api/product.api';

import { MdWhatsapp, MdMail } from 'react-icons/md';

import { MdAlternateEmail } from 'react-icons/md';

import map from './assets/images/map.png';
import config from './config/config';

import "./components/fancy-buttons/hover.glow.css";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { TextArea } = Input;

const baseUrl = `${config.baseUrl}/api/v0/product/image`;

const Product = () => {
  const { id } = useParams();
  const mobile = window.innerWidth < 500;

  const [msgBoxOpen, setMsgBoxOpen] = useState(false);
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
    phoneNumber: '',
    countryCode: '',
    created: ''
  });


  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await fetchProduct(id);
    console.log('got product:', result)
    setData(result)
  }

  const toggleMsgBox = () => {
    if (msgBoxOpen) {
      setMsgBoxOpen(false);
    } else {
      setMsgBoxOpen(true);
    }
  }

  const MessageBox = () => {
    const [msgData, setMsgData] = useState({
      name: '',
      contact: '',
      message: ''
    });

    const handleChange = (name, event) => {
      console.log(msgData)
      setMsgData({ ...msgData, [name]: event.target.value });
    }

    const submit = async () => {
      const params = {
        product: {
          id: data._id
        },
        customer: {
          name: msgData.name,
          contact: msgData.contact,
          message: msgData.message
        }
      };

      console.log('sending params:', params)

      const result = await productEmail(params);
      console.log('email send result:', result)
    }


    return (
      <>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Name">
            <Input
              value={msgData.name}
              placeholder='Your Name'
              onChange={(e) => handleChange('name', e)}
            />
          </Form.Item>
          <Form.Item label="Contact Detail">
            <Input placeholder='Phone Number or Email Address' onChange={(e) => handleChange('contact', e)} />
          </Form.Item>
          <Form.Item label="Message">
            <TextArea placeholder="Message" autoSize style={{ minHeight: 100 }} onChange={(e) => handleChange('message', e)} />
          </Form.Item>
          <div style={{ float: 'right' }}>
            <button style={{ background: 'rgb(32, 75, 32)' }} onClick={submit}>
              Send
            </button>
          </div>
        </Form>

      </>
    )
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
  const AdSection = ({ height, width }) => {
    const mobile = window.innerWidth < 500;

    return (
      <div style={{ textAlign: 'center', paddingTop: mobile ? 0 : 20, paddingBottom: mobile ? 20 : 0 }}>
        <div style={{ height: height, background: 'black', maxWidth: width, marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{ fontSize: 20, color: 'white' }}>Ad</p>
        </div>
      </div>
    )
  };

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
              <div style={{ marginTop: -10 }}>
                <p style={{ display: 'inline-block', fontSize: mobile ? 18 : 25 }}>{data.name}</p>
                <p style={{ display: 'inline-block', float: 'right', fontSize: mobile ? 18 : 25 }}>
                  {data.currency}{" "}{formatPrice(data.price)}
                  {
                    !mobile && <EditButton />
                  }
                </p>
              </div>
              <p style={{ lineHeight: 0, fontSize: mobile ? 12 : 15, marginTop: -10, color: 'grey' }}>{dayjs(data.created).fromNow()}</p>
              <p style={{ fontSize: mobile ? 15 : 16, color: 'grey', marginTop: 27 }}><MdLocationPin style={{ marginBottom: -2, color: 'green' }} />{data.location}</p>
              <p style={{ fontSize: mobile ? 15 : 16 }}>{data.description}</p>
            </div>
            {
              data.contactMethod === 'WA' && data.phoneNumber && (
                <div style={{ float: 'right' }}>
                  <button
                    onClick={() => window.open(`https://wa.me/${data.countryCode}${data.phoneNumber}`)}
                    style={{ background: 'green', padding: 9, fontSize: 16 }}
                  >
                    <MdWhatsapp style={{ marginBottom: -6, fontSize: 22, paddingRight: 1 }} />
                    Chat on Whatsapp
                  </button>
                </div>
              )
            }
            {
              data.contactMethod === 'MAIL' && data.email && (
                <div style={{ float: 'right', width: mobile ? '100%' : '60%' }}>
                  <div>
                    <div style={{ float: 'right' }}>
                      <button
                        // className="glow-on-hover"
                        onClick={toggleMsgBox}
                        style={{ background: msgBoxOpen ? 'black' : 'rgb(176, 175, 67)', padding: 7, fontSize: 13, color: msgBoxOpen ? 'grey' : 'rgb(0, 0, 0)', fontWeight: 600 }}
                      >
                        <MdMail style={{ marginBottom: -7, fontSize: 22, paddingRight: 1 }} />
                        {"Send Email"}
                      </button>
                    </div>
                    {
                      msgBoxOpen && (
                        <div style={{ paddingTop: mobile ? 40 : 70 }}>
                          <MessageBox />
                        </div>
                      )
                    }
                  </div>
                </div>
              )
            }
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={9}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ textAlign: 'left', paddingLeft: mobile ? 0 : '7%', paddingBottom: 5 }}>
                <MdLocationPin style={{ fontSize: 18, marginBottom: -4, color: 'green' }} />
                Product Location
              </div>
              <img src={map} style={{ height: mobile ? 320 : 400, width: mobile ? '100%' : 400, objectFit: 'cover', borderRadius: 5 }} />
              <br />
              <AdSection height={300} width={300} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Product;
