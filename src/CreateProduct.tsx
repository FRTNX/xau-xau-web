import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

import { Carousel, Col, Row } from 'antd';
import defaultImg from './assets/images/1.jpg';
import img from './assets/images/2.jpg';

import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormDisabledDemo: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item label="Slider">
          <Slider />
        </Form.Item>
        <Form.Item label="ColorPicker">
          <ColorPicker />
        </Form.Item>
        <Form.Item label="Rate">
          <Rate />
        </Form.Item>
      </Form>
    </>
  );
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App: React.FC = () => {
  const mobile = window.innerWidth < 500;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewList, setPreviewList] = useState([]);
  const [data, setData] = useState({
    name: 'Acer Laptop i7 8th Gen',
    description: 'Im selling a powerful acer laptop in good condition. The laptop has an 8th generation intel i7 processor, 32 GB DDR4 RAM, 1TB SSD, and comes with a charger, USB adapter, and VGA cables.',
    price: 180,
    currency: 'USD$',
    location: 'Bulawayo',
    category: 'Computers',
    created: '5 days ago'
  })

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList)
    updatePreviewList(newFileList);
  }

  const updatePreviewList = async (fileList) => {
    const newList = await Promise.all(fileList.map(async (file: UploadFile) => await getBase64(file.originFileObj as FileType)))
    console.log('preview list:', newList)
    setPreviewList(newList);
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={15}>
            <Carousel arrows infinite={false} autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
              {
                previewList.map((file, index) => (
                  <div>
                    <img
                      src={file}
                      width={'100%'}
                      height={mobile ? 400 : 600}
                      style={{ objectFit: 'cover', borderRadius: 10 }} />
                    {/* <p>{index}</p> */}
                  </div>
                ))
              }
            </Carousel>
            <div>
              <div style={{ fontSize: 28 }}>
                <p style={{ display: 'inline-block' }}>{data.name}</p>
                <p style={{ display: 'inline-block', float: 'right' }}>{data.currency}{" "}{Number(data.price).toFixed(2)}</p>
              </div>
              <p style={{ lineHeight: 0, fontSize: 18}}>{data.created}</p>
              <p style={{ fontSize: 18}}>{data.location}</p>
              <p style={{ fontSize: 16}}>{data.description}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={9}>
            <>
              <Upload
                action="http://localhost:5555/api/v0/mock/img/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
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
            </>
          </Col>
        </Row>
      </div>
    </>
  )
};

export default App;
