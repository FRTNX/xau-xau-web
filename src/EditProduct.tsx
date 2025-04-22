// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';;
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

import { Carousel, Col, Row } from 'antd';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Rate,
  Select,
  Space,
  ConfigProvider,
  theme
} from 'antd';

import { MdImage, MdLocationPin } from 'react-icons/md';

import { formatPrice } from './utils';
import { createProduct, fetchProduct } from './api/product.api';

import auth from './auth/auth-helper';
import config from './config/config';


const baseUrl = `${config.baseUrl}/api/v0/product/image`;

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const jwt = auth.isAuthenticated();

  const mobile = window.innerWidth < 500;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewList, setPreviewList] = useState([]);

  const [formDisabled, setFormDisabled] = useState(false);

  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('');

  const [contactMethod, setContactMethod] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [email, setEmail] = useState('');

  const [data, setData] = useState({
    name: '',
    description: '',
    location: '',
    category: '',
    created: '',
    images: []
  });

  useEffect(() => {
    populateProduct();
  }, []);

  const populateProduct = async () => {
    const result = await fetchProduct(id);
    console.log('got product:', result)
    setData(result);
    setCategory(result.category);
    setStatus(result.status);
    setPrice(result.price);
    setCurrency(result.currency);
    handleChangeContactMethod(result.contactMethod);
    if (result.countryCode) {
      setCountryCode(result.countryCode)
    }
    if (result.phoneNumber) {
      setPhoneNumber(result.phoneNumber)
    }
    if (result.email) {
      setEmail(result.email)
    }
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList)
    updatePreviewList(newFileList);
  }

  const handleChange = (name, event) => {
    console.log(`updating ${name} with ${event.target.value}`)
    setData({ ...data, [name]: event.target.value });
  }

  const handlePriceChange = (newPrice: number | null) => {
    if (newPrice) {
      console.log('price event:', newPrice)
      setPrice(newPrice)
    }
  }

  const handleChangeCurrency = (newCurrency: string | null) => {
    if (newCurrency) {
      console.log('category event:', newCurrency)
      setCurrency(newCurrency);
    }
  };

  const handleChangeContactMethod = (method: string | null) => {
    if (method) {
      setContactMethod(method);
    }
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePhoneNumber = (newNumber: number | null) => {
    if (newNumber) {
      setPhoneNumber(newNumber);
    }
  };

  const handleChangeCountryCode = (code: string | null) => {
    if (code) {
      setCountryCode(code);
    }
  }

  const handleChangeCategory = (newCategory: string | null) => {
    if (newCategory) {
      setCategory(newCategory)
    }
  }

  const handleChangeStatus = (newStatus: string | null) => {
    if (newStatus) {
      setStatus(newStatus)
    }
  }

  const updatePreviewList = async (fileList) => {
    const newList = await Promise.all(fileList.map(async (file: UploadFile) => await getBase64(file.originFileObj as FileType)))
    console.log('preview list:', newList)
    setPreviewList(newList);
  };

  const submit = async () => {
    if (jwt) {
      const formData = new FormData();
      console.log('got local user id:', jwt.user._id)
      fileList.map((file) => {
        if (file.originFileObj) {
          formData.append(`images`, file.originFileObj);
        }
      })
      jwt.user._id && formData.append('userId', jwt.user._id);
      data.name && formData.append('name', data.name);
      data.description && formData.append('description', data.description);
      category && formData.append('category', category);
      price && formData.append('price', String(price));
      currency && formData.append('currency', currency)
      status && formData.append('status', status);
      contactMethod && formData.append('contactMethod', contactMethod);
      data.location && formData.append('location', data.location);
      phoneNumber && formData.append('phoneNumber', String(phoneNumber));
      countryCode && formData.append('countryCode', countryCode);
      email && formData.append('email', email);

      const result = await createProduct(formData);
      console.log('result:', result)

      if (result.productId) {
        window.location.href = `/product/${result.productId}`
      }
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <ConfigProvider
        theme={{ algorithm: [theme.darkAlgorithm], token: { colorBgContainer: '#292929' } }}
      >
        <div style={{ minHeight: '100vh' }}>
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={15}>
              <Carousel arrows infinite={false} autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
                {
                  data.images.map((imageUrl, index) => (
                    <div key={index}>
                      <img
                        src={imageUrl}
                        width={'100%'}
                        height={mobile ? 400 : 600}
                        style={{ objectFit: 'cover', borderRadius: 10 }} />
                    </div>
                  ))
                }

              </Carousel>
              {
                data.images.length === 0 && (
                  <div style={{ height: mobile ? 400 : 600, textAlign: 'center' }}>
                    <MdImage size={mobile ? 250 : 400} color='grey' />
                    <p>Uploaded images will appear here.</p>
                  </div>
                )
              }
              <div>
                <div style={{ marginTop: -10 }}>
                  <p style={{ display: 'inline-block', fontSize: mobile ? 18 : 25 }}>{data.name}</p>
                  <p style={{ display: 'inline-block', float: 'right', fontSize: mobile ? 18 : 25 }}>
                    {currency}{" "}{formatPrice(price)}
                  </p>
                </div>
                <p style={{ lineHeight: 0, fontSize: mobile ? 12 : 15, marginTop: -10, color: 'grey' }}>{'5 days ago'}</p>
                <p style={{ fontSize: mobile ? 15 : 16, color: 'grey', marginTop: 27 }}><MdLocationPin style={{ marginBottom: -2, color: 'green' }} />{data.location}</p>
                <p style={{ fontSize: mobile ? 15 : 16 }}>{data.description}</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={9}>
              <>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{}}
                  layout="horizontal"
                  disabled={formDisabled}
                  style={{ maxWidth: 600, color: 'white' }}
                // action={}
                >
                  <Form.Item label={<p>Upload</p>} valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                      action={`${config.baseUrl}/api/v0/mock/img/upload`}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleImageChange}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                      <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                          visible: previewOpen,
                          onVisibleChange: (visible) => setPreviewOpen(visible),
                          afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label={<p>Item Name</p>}>
                    <Input
                      value={data.name}
                      onChange={(e) => handleChange('name', e)}
                    />
                  </Form.Item>
                  <Form.Item label={<p>Price</p>}>
                    <Space.Compact>
                      <Select
                        defaultValue={'USD$'}
                        style={{ width: '50%', height: 35 }}
                        onChange={handleChangeCurrency}
                      >
                        <Select.Option value="USD$">USD</Select.Option>
                        <Select.Option value="ZAR">Rand</Select.Option>
                        <Select.Option value="ZIG$">ZIG</Select.Option>
                      </Select>
                      <InputNumber
                        style={{ width: '100%' }}
                        type='number'
                        value={price}
                        onChange={handlePriceChange}
                      />
                    </Space.Compact>
                  </Form.Item>
                  <Form.Item label={<p>Category</p>}>
                    <Select
                      style={{}}
                      onChange={handleChangeCategory}
                    >
                      <Select.Option value="computers">Computers & Electronics</Select.Option>
                      <Select.Option value="vehicles">Vehicles</Select.Option>
                      <Select.Option value="accomodation">Rooms to Rent</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label={<p>Status</p>}>
                    <Select
                      defaultValue={'AV'}
                      style={{}}
                      onChange={handleChangeStatus}
                    >
                      <Select.Option value="AV">Available</Select.Option>
                      <Select.Option value="UA">Sold</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label={<p>Contact Method</p>}>
                    <Select
                      defaultValue={'WA'}
                      style={{}}
                      onChange={handleChangeContactMethod}
                    >
                      <Select.Option value="WA">Whatsapp</Select.Option>
                      <Select.Option value="MAIL">Email</Select.Option>
                    </Select>
                  </Form.Item>
                  {
                    contactMethod === 'WA' && (
                      <Form.Item label={<p>Whatsapp Number</p>}>
                        <Space.Compact>
                          <Select
                            defaultValue={'263'}
                            style={{ width: '50%', height: 35 }}
                            onChange={handleChangeCountryCode}
                          >
                            <Select.Option value="263">+263</Select.Option>
                            <Select.Option value="27">+27</Select.Option>
                            <Select.Option value="1">+1</Select.Option>
                          </Select>
                          <InputNumber
                            style={{ width: '100%' }}
                            type='number'
                            value={phoneNumber}
                            onChange={handleChangePhoneNumber}
                          />
                        </Space.Compact>

                      </Form.Item>
                    )
                  }
                  {
                    contactMethod === 'MAIL' && (
                      <Form.Item label={<p>Email Address</p>}>
                        <Input
                          value={email}
                          onChange={handleChangeEmail}
                        />

                      </Form.Item>
                    )
                  }
                  <Form.Item label={<p>Location</p>}>
                    <Input
                      value={data.location}
                      onChange={(e) => handleChange('location', e)}
                    />
                  </Form.Item>
                  <Form.Item label={<p>Description</p>}>
                    <TextArea
                      value={data.description}
                      onChange={(e) => handleChange('description', e)}
                      rows={4}
                    />
                  </Form.Item>
                  <Form.Item label={<p>Rate</p>}>
                    <Rate />
                  </Form.Item>
                  <div style={{ maxWidth: 600, float: 'right', marginRight: 'auto' }}>
                    <Button onClick={submit}>Submit</Button>
                  </div>
                </Form>
              </>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </>
  )
};

export default EditProduct;
