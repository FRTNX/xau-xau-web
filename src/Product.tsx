import { useParams } from 'react-router-dom'
import { Carousel, Col, Row } from 'antd';
import defaultImg from './assets/images/1.jpg';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Product = () => {
  const { id } = useParams()
  console.log('product id:', id)

  return (
    <>
      <div style={{ minHeight: '100vh'}}>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={15}>
            <Carousel arrows infinite={false} autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
              <div>
                <img src={defaultImg} width={'100%'} />
              </div>
              <div>
                <img src={defaultImg} width={'100%'} />
              </div>
              <div>
                <img src={defaultImg} width={'100%'} />
              </div>
              <div>
                <img src={defaultImg} width={'100%'} />
              </div>
            </Carousel>
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
