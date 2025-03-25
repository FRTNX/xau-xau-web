import { useParams } from 'react-router-dom'
import { Carousel, Col, Row } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

import { fetchImages, fetchProduct } from './api/product.api';
import { useEffect, useState } from 'react';
import config from './config/config';

const baseUrl = `${config.baseUrl}/api/v0/product/image`;

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

const Product = () => {
  const mobile = window.innerWidth < 500;
  const { id } = useParams()
  console.log('product id:', id)

  // const [images, setImages] = useState([]);

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
    // loadImages();
  }, []);

  const loadProduct = async () => {
    const result = await fetchProduct(id);
    console.log('got product:', result)
    setData(result)
  }

  // const loadImages = async () => {
  //   const result = await fetchImages(id);
  //   console.log('image result:', result)
  //   const sliderImages = await Promise.all(result.map(async (image) => await getBase64(new Blob([image.data]))))
  //   console.log('preview list:', sliderImages)
  //   setImages(sliderImages)
  // }


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
                <p style={{ display: 'inline-block', float: 'right' }}>{data.currency}{" "}{Number(data.price).toFixed(2)}</p>
              </div>
              <p style={{ lineHeight: 0, fontSize: 18 }}>{data.created}</p>
              <p style={{ fontSize: 18 }}>{data.location}</p>
              <p style={{ fontSize: 16 }}>{data.description}</p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={9}>
            <div style={{ fontSize: 20, lineHeight: 0 }}>
              {/* <p>Acer Laptop</p>
              <p>Acer Laptop</p>
              <p>Acer Laptop</p>
              <p>Acer Laptop</p>
              <p>Acer Laptop</p>
              <p>Acer Laptop</p>
              <p>Acer Laptop</p>
              <p>Acer Laptop</p> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Product;
