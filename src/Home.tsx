import { useEffect, useState } from "react";
import { Row, Col } from "antd";

import config from "./config/config";

import { fetchProducts, fetchCategories } from "./api/product.api";

import './xau.css'

const baseUrl = `${config.baseUrl}/api/v0/product/thumbnail`;


const CategoryListing = ({ category, title }) => {
  // todo: group items within categories
  const [items, setItems] = useState([
    {
      _id: '67e27f0146e9aad23bfda25c',
      name: 'Item Title',
      price: 7,
      currency: 'USD$',
      location: 'Bulawayo',
      created: '2025-03-25T10:01:37.555Z'
    }
  ]);


  if (3 < 1) {
    setItems(items)
  }

  useEffect(() => {
    populateProducts();
  }, [])

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
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 20 }, 18]}>
              {
                items.map((item, index) => (
                  <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                    <div style={{}} key={index}>
                      <img src={baseUrl + `?id=${item._id}`} width={'100%'} height={238} style={{ objectFit: 'cover' }} />
                      <div style={{ lineHeight: 0 }}>
                        <div>
                          <p style={{ display: 'inline-block' }}>{item.name}</p>
                          <p style={{ display: 'inline-block', float: 'right' }}>{item.currency}{" "}{Number(item.price).toFixed(2)}</p>
                        </div>
                        <p>{item.location}</p>
                      </div>
                      <div style={{ float: 'right' }}>
                        <button
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
