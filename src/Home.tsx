import { useEffect, useState } from "react";
import { Row, Col } from "antd";

import config from "./config/config";

import { fetchProducts, fetchCategories } from "./api/product.api";
import { EyeOutlined } from "@ant-design/icons";
import './xau.css'

const baseUrl = `${config.baseUrl}/api/v0/product/thumbnail`;


const CategoryListing = ({ category, title }) => {
  const [items, setItems] = useState([
    {
      _id: '67e27f0146e9aad23bfda25c',
      name: 'Item Title',
      price: 7,
      currency: 'USD$',
      views: 0,
      location: 'Bulawayo',
      created: '2025-03-25T10:01:37.555Z',

    }
  ]);

  useEffect(() => {
    populateProducts();
  }, []);

  const populateProducts = async () => {
    const result = await fetchProducts(category, 4);
    console.log('got products:', result)
    setItems(result);
  };

  return (
    <>
      {
        items.length > 0 && (
          <div style={{ verticalAlign: 'top', width: '100%' }}>
            <p>{title}</p>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 15 }, 18]}>
              {
                items.map((item, index) => (
                  <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                    <div style={{ background: 'linear-gradient(rgb(112, 114, 115), black 50%)', height: '100%', padding: 0, borderRadius: 5, }} key={index}>
                      <img src={baseUrl + `?id=${item._id}`} width={'100%'} height={238} style={{ objectFit: 'cover' }} />
                      <div style={{ lineHeight: 0, padding: 5 }}>
                        <div>
                          <p style={{ display: 'inline-block' }}>{item.name}</p>
                          <p style={{ display: 'inline-block', float: 'right' }}>{item.currency}{" "}{Number(item.price).toFixed(2)}</p>
                        </div>
                        <div>
                          <p style={{ display: 'inline-block' }}>{item.location}</p>
                          <div style={{ display: 'inline-block', float: 'right', marginTop: 4 }}><EyeOutlined style={{ verticalAlign: 'middle', marginTop: -1 }} /> {Number(item.views)}</div>
                        </div>
                      </div>
                      <div style={{ float: 'right', paddingBottom: 5, paddingRight: 5 }}>
                        <button
                          style={{ borderRadius: 0 }}
                          onClick={() => window.location.href = `/product/${item._id}`}
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
          </div >
        )
      }
    </>
  )
}

const Home = () => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    populateCategories();
  }, []);

  const populateCategories = async () => {
    const result = await fetchCategories();
    console.log('categories from server:', result)
    setCategories(result);
  }

  return (
    <>
      {
        Object.keys(categories).map((category) => (
          <CategoryListing category={category} title={categories[category]} />
        ))
      }
    </>
  )
}

export default Home;
