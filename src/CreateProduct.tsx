// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { GetProp, UploadFile, UploadProps, message } from 'antd';

import { Carousel, Col, Row } from 'antd';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  ConfigProvider,
  theme
} from 'antd';

import { MdPriceChange } from 'react-icons/md';
import { MdWhatsapp, MdMail } from 'react-icons/md';
import { MdImage, MdLocationPin, MdWindPower } from 'react-icons/md';

import imageCompression from 'browser-image-compression';
import { createProduct, createThumbnail } from './api/product.api';

import { formatPrice } from './utils';
import config from './config/config';

import auth from './auth/auth-helper';

import MessageBox from './MessageBox';

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

const NewProduct: React.FC = () => {
  const jwt = auth.isAuthenticated();
  const mobile = window.innerWidth < 500;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewList, setPreviewList] = useState([]);

  const [formDisabled, setFormDisabled] = useState(false);

  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('AV');

  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('USD$');

  const [contactMethod, setContactMethod] = useState('WA');
  const [countryCode, setCountryCode] = useState('263');

  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [email, setEmail] = useState('');

  const [location, setLocation] = useState('');
  const [imageBlobs, setImageBlobs] = useState([]);

  const [base64String, setBase64String] = useState('');
  const [blobData, setBlobData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [compressedImages, setCompressedImages] = useState([]);

  const [thumbnail, setThumbnail] = useState([]);
  const [msgBoxOpen, setMsgBoxOpen] = useState(false);

  const [fdata, setFdata] = useState();

  const [data, setData] = useState({
    name: 'Item Title',
    description: 'Item Description.',
    location: ''
  });

  const [locations, setLocations] = useState([
    "Nationwide",
    "Online",
    "Harare",
    "Bulawayo",
    "Gweru",
    "Bindura",
    "Mutare",
    "Masvingo",
    "Zvishavane",
    "Chinhoyi",
    "Mutoko",
    "Chiruma",
    "Dzaloniya",
    "Kezi",
    "Nkayi",
    "Gwanda",
    "Matopo",
    "Victoria Falls"
  ]);

  const [helperText, setHelperText] = useState({
    upload: { text: '', color: '' },
    name: { text: '', color: '' },
    price: { text: '', color: '' },
    category: { text: '', color: '' },
    status: { text: '', color: '' },
    contactMethod: { text: '', color: '' },
    phoneNumber: { text: "Tip: use the format '786547877' instead of '0786547877'", color: '' },
    email: { text: '', color: '' },
    location: { text: '', color: '' },
    description: { text: '', color: '' }
  });

  const colors = {
    success: 'green',
    warning: 'yellow',
    error: 'red'
  }

  const validPhoneNumber = () => {
    const violations = String(phoneNumber).length !== 9;
    console.log('violations', violations)
    return !violations;
  }

  const validateProduct = () => {
    let issues = false;
    let updateValues = {
      upload: { text: '', color: '' },
      name: { text: '', color: '' },
      price: { text: '', color: '' },
      category: { text: '', color: '' },
      status: { text: '', color: '' },
      contactMethod: { text: '', color: '' },
      phoneNumber: { text: '', color: '' },
      email: { text: '', color: '' },
      location: { text: '', color: '' },
      description: { text: '', color: '' }
    };
    const add = (params) => {
      updateValues = { ...updateValues, ...params }
      issues = true;
    }

    if (fileList.length === 0) {
      add({ upload: { text: 'Please select at least one image', color: colors.error } });
    }

    if (!data.name || data.name === 'Item Title') {
      add({ name: { text: 'Item name is required', color: colors.error } });
    }

    if (price < 1) {
      add({ price: { text: 'Product cannot be free. Kusemhlabeni', color: colors.error } });
    }

    if (!category) {
      add({ category: { text: 'Item category is required', color: colors.error } });
    }

    if (contactMethod === 'WA') {
      if (!phoneNumber) {
        add({ phoneNumber: { text: 'Whatsapp number is required', color: colors.error } });
      }

      if (!validPhoneNumber()) {
        add({ phoneNumber: { text: 'Invalid phone number', color: colors.error } });
      }
    }

    if (contactMethod === 'MAIL') {
      if (!email) {
        add({ email: { text: 'Email address is required', color: colors.error } });
      }
    }

    if (!location) {
      add({ location: { text: 'Item location is required', color: colors.error } });
    }

    if (!data.description || data.description === 'Item Description.') {
      add({ description: { text: 'Item description is required', color: colors.error } });
    }

    if (data.description.length < 150) {
      add({ description: { text: 'Item description must be at least 150 characters', color: colors.error } });
    }
    console.log('found product issues:', { ...helperText, ...updateValues })

    setHelperText(current => ({ ...helperText, ...updateValues }))

    return !issues;
  }

  useEffect(() => {
    console.log('effecting', compressedImages.length, fileList.length, thumbnail.length)
    if ((compressedImages.length === fileList.length) && fdata && thumbnail.length === 1) {
      compressedImages.map((file) => {
        fdata.append(`images`, file);
      });
      submitProduct(fdata)
    }
  }, [compressedImages, thumbnail]);

  const submitProduct = async (formData) => {
    const result = await createProduct(formData);
    console.log('result:', result)
    if (result.productId) {
      const thumbnailForm = new FormData();
      thumbnailForm.append('thumbnail', thumbnail[0]);
      const res = await createThumbnail(result.productId, thumbnailForm);
      console.log('thumbnail creation result:', res)
      message.success('Success!')
      //todo: validate thumbnail res before redirecting
      window.location.href = `/product/${result.productId}`
    } else {
      setLoading(false);
      message.success('Submission failed.')
      setHelperText({ ...helperText, description: { text: 'An upload error occured. Check your connection and try again', color: colors.error}})
    }
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const compressImages = async (files) => {
    setLoading(true);
    setCompressedImages(current => [])
    await files.map(async (imageFile, index) => {
      const file = imageFile.originFileObj;
      const reader = new FileReader();

      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const blob = new Blob([arrayBuffer], { type: file.type })

        const options = {
          maxSizeMB: 1,
          useWebWorker: true,
        }

        try {
          const compressedFile = await imageCompression(file, options);

          setCompressedImages(current => [...current, compressedFile])
        } catch (error) {
          console.log(error);
        }

        if (index === 0) {  // use first image as thumbnail
          const thumbOptions = {
            maxSizeMB: 0.1,
            useWebWorker: true,
          }

          try {
            const compressedThumbnail = await imageCompression(file, thumbOptions);

            setThumbnail(current => [compressedThumbnail])
          } catch (error) {
            console.log(error);
          }
        }
      };

      await reader.readAsArrayBuffer(file);
    })
  };

  const handleImageChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList)
    updatePreviewList(newFileList);
  }

  const handleChange = (name, event) => {
    setData({ ...data, [name]: event.target.value });
  }

  const handlePriceChange = (newPrice: number | null) => {
    if (newPrice) {
      setPrice(newPrice)
    }
  }

  const handleChangeCurrency = (newCurrency: string | null) => {
    if (newCurrency) {
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

  const handleChangeLocation = (newLocation: string | null) => {
    if (newLocation) {
      setLocation(newLocation)
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

  const toggleMsgBox = () => {
    if (msgBoxOpen) {
      setMsgBoxOpen(false);
    } else {
      setMsgBoxOpen(true);
    }
  }

  const validateImages = async (rule, getValueByDataKey, callback) => {
    if (fileList.length === 0) {
      callback('Please select at least one image.')
    } else {
      callback();
    }
  }

  const submit = async () => {
    if (validateProduct()) {
      const compressedFiles = await compressImages(fileList);
      const formData = new FormData();
      const userId = jwt.user._id;
      userId && formData.append('userId', userId);
      data.name && formData.append('name', data.name);
      data.description && formData.append('description', data.description);
      category && formData.append('category', category);
      price && formData.append('price', String(price));
      currency && formData.append('currency', currency)
      status && formData.append('status', status);
      contactMethod && formData.append('contactMethod', contactMethod);
      location && formData.append('location', location);
      phoneNumber && formData.append('phoneNumber', String(phoneNumber));
      countryCode && formData.append('countryCode', countryCode);
      email && formData.append('email', email);
      setFdata(formData);
    }
  }

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
  };

  const HelperText = ({ text, color }) => 
  <div style={{ paddingBottom: mobile ? 0 : 12}}>
    <span style={{ color }}>{text}</span>
  </div>

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
          token: {
            colorBgContainer: '#292929',
            colorError: 'rgb(91, 156, 78)'
          }
        }}
      >
        <div style={{ minHeight: '100vh' }}>
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
            <Col xs={24} sm={24} md={24} lg={15} xl={15}>
              <Carousel arrows infinite={false} autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
                {
                  previewList.map((file, index) => (
                    <div key={index}>
                      <img
                        src={file}
                        width={'100%'}
                        height={mobile ? 400 : 600}
                        style={{ objectFit: 'cover', borderRadius: 10 }} />
                    </div>
                  ))
                }

              </Carousel>
              {
                previewList.length === 0 && (
                  <div style={{ height: mobile ? 400 : 600, textAlign: 'center' }}>
                    <MdImage size={mobile ? 250 : 400} color='grey' />
                    <p style={{ fontSize: mobile ? 14 : 16 }}>Uploaded images will appear here.</p>
                  </div>
                )
              }
              <div>
                <div style={{ marginTop: -10 }}>
                  <p style={{ fontSize: mobile ? 23 : 25, lineHeight: 1.3 }}>{data.name}</p>
                  <p style={{ fontSize: 17, marginTop: -20 }}>
                    {currency}{" "}{formatPrice(price)} <MdPriceChange style={{ color: 'rgb(117, 170, 106)' }} />
                  </p>
                </div>
                <p style={{ lineHeight: 0, fontSize: mobile ? 12 : 15, marginTop: -5, color: 'grey' }}>{'[date section]'}</p>
                <p style={{ fontSize: mobile ? 15 : 16, color: 'grey', marginTop: 25, marginLeft: -5 }}><MdLocationPin style={{ marginBottom: -2, color: 'green' }} />{location}</p>
                <p style={{ whiteSpace: 'pre-line', fontSize: mobile ? 15 : 16 }}>{data.description}</p>
              </div>
              {
                contactMethod === 'WA' && phoneNumber && validPhoneNumber() &&  (
                  <div style={{ float: 'right', paddingTop: 100 }}>
                    <button
                      onClick={() => window.open(`https://wa.me/${countryCode}${phoneNumber}`)}
                      style={{ background: 'green', padding: 9, fontSize: mobile ? 13 : 16 }}
                    >
                      <MdWhatsapp style={{ marginBottom: -6, fontSize: mobile ? 20 : 22, paddingRight: 1 }} />
                      Chat on Whatsapp
                    </button>
                  </div>
                )
              }
              {
                contactMethod === 'MAIL' && email && (
                  <div
                    style={{
                      float: 'right',
                      width: mobile ? '100%' : '60%',
                      paddingBottom: mobile ? 100 : 0,
                      paddingTop: 100
                    }}
                    >
                    <div>
                      <div style={{ float: 'right' }}>
                        <button
                          // className="glow-on-hover"
                          onClick={toggleMsgBox}
                          style={{
                            background:'rgb(156, 193, 171)',
                            padding: 7,
                            paddingBottom: 10,
                            fontSize: 13,
                            color: msgBoxOpen ? 'rgb(0,0,0)' : 'rgb(0, 0, 0)',
                            fontWeight: 600,
                            borderRadius: 5
                          }}
                        >
                          <MdMail style={{ marginBottom: -7, fontSize: 22, paddingRight: 1 }} />
                          {"Send a test email"}
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
            <Col xs={24} sm={24} md={24} lg={9} xl={9}>
              <>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{}}
                  layout="horizontal"
                  disabled={formDisabled}
                  style={{ maxWidth: 600, color: 'white' }}
                  onFinish={onFinish}
                  initialValues={{
                    remember: true,
                  }}
                >
                  <Form.Item
                    label={<p>Upload</p>}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    help={<HelperText {...helperText.upload} />}
                  >
                    <Upload
                      // todo: limit file types to images
                      action={`/poop`}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleImageChange}
                      maxCount={4}
                      className='upload-box'
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
                  <Form.Item
                    label={<p>Item Name</p>}
                    help={<HelperText {...helperText.name} />}
                  >
                    <Input
                      value={data.name}
                      onChange={(e) => handleChange('name', e)}
                      maxLength={60}
                    />
                  </Form.Item>
                  <Form.Item
                    label={<p>Price</p>}
                    help={<HelperText {...helperText.price} />}
                  >
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
                  <Form.Item
                    label={<p>Category</p>}
                    help={<HelperText {...helperText.category} />}
                  >
                    <Select
                      style={{}}
                      onChange={handleChangeCategory}
                    >
                      <Select.Option value="computers">Computers & Electronics</Select.Option>
                      <Select.Option value="vehicles">Vehicles</Select.Option>
                      <Select.Option value="accomodation">Accomodation: Houses, Rooms, Land</Select.Option>
                      <Select.Option value="home_goods">Home Goods: Furniture & Appliances</Select.Option>
                      <Select.Option value="services">Services</Select.Option>
                      <Select.Option value="events">Events</Select.Option>
                      <Select.Option value="collectables">Art & Collectables</Select.Option>
                      <Select.Option value="food_bev">Food & Beverages</Select.Option>
                      <Select.Option value="other">Other</Select.Option>
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
                      <Form.Item label={<p>Whatsapp Number</p>} help={<HelperText {...helperText.phoneNumber} />}>
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
                      <Form.Item label={<p>Email Address</p>} help={<HelperText {...helperText.email} />}>
                        <Input
                          value={email}
                          onChange={handleChangeEmail}
                        />

                      </Form.Item>
                    )
                  }
                  <Form.Item
                    label={<p>Location</p>}
                    help={<HelperText {...helperText.location} />}
                    style={{ }}
                  >
                    <Select
                      style={{}}
                      onChange={handleChangeLocation}
                    >
                      {
                        locations.map((loc) => <Select.Option value={loc}>{loc}</Select.Option>)
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item label={<p>Description</p>} help={<HelperText {...helperText.description} />}>
                    <TextArea
                      value={data.description}
                      style={{ minHeight: 100 }}
                      maxLength={1700}
                      onChange={(e) => handleChange('description', e)}
                      autoSize
                    />
                  </Form.Item>
                  <div style={{ maxWidth: 600, float: 'right', marginRight: 'auto', paddingTop: mobile ? 30 : 0 }}>
                    <Button disabled={loading} onClick={submit} >
                      <MdWindPower color={loading ? 'grey' : 'green'} />
                      Submit</Button>
                  </div>
                </Form>
              </>
            </Col>
          </Row>
        </div>
      </ConfigProvider >
    </>
  )
};

export default NewProduct;
