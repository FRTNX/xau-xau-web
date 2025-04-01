import { useEffect, useState } from "react";
import { Row, Col, Space, Select } from "antd";

import config from "./config/config";

import { fetchProducts, fetchCategories } from "./api/product.api";

import { MdLocationPin } from "react-icons/md";
import { EyeOutlined } from "@ant-design/icons";

import { formatPrice, shuffleArray } from "./utils";

import "./components/fancy-buttons/hover.glow.css";
import './xau.css';

import Selectables from "./components/Selectable";

const baseUrl = `${config.baseUrl}/api/v0/product/thumbnail`;


const formatString = (s: string, maxLength: number) => s.length > maxLength ? s.slice(0, maxLength) + '...' : s;

const AdSection = () => {
  const mobile = window.innerWidth < 500;

  return (
    <div style={{ textAlign: 'center', paddingTop: mobile ? 0 : 20, paddingBottom: mobile ? 20 : 0 }}>
      <div style={{ height: 200, background: 'black', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
        <p style={{ fontSize: 20, color: 'white' }}>Ad</p>
      </div>
    </div>
  )
};

const CategoryListing = ({ category, title }) => {
  const mobile = window.innerWidth < 500;
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
          <div style={{ verticalAlign: 'top', width: '100%', paddingTop: 40 }}>
            <p
              className="glowing-text"
              style={{
                fontSize: mobile ? 23 : 28,
                color: 'rgb(255, 255, 255)',
                marginBottom: 5,
              }}
            >{title}</p>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 17 }, 18]}>
              {
                items.map((item, index) => (
                  <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                    <div style={{ background: 'linear-gradient(rgb(112, 114, 115), black 50%)', height: '100%', padding: 0, borderRadius: 5, }} key={index}>
                      <img
                        src={baseUrl + `?id=${item._id}`}
                        width={'100%'}
                        height={238}
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div style={{ lineHeight: 0, padding: 5, marginTop: -10 }}>
                        <div>
                          <p
                            style={{
                              display: 'inline-block',
                              maxWidth: 250,
                              fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                            }}
                          >
                            {formatString(item.name, 32)}
                          </p>
                          <p style={{ display: 'inline-block', float: 'right' }}>{item.currency}{" "}{formatPrice(item.price)}</p>
                        </div>
                        <div>
                          <p style={{ display: 'inline-block', color: 'grey' }}><MdLocationPin style={{ marginTop: -10, marginBottom: -2, color: 'green' }} />{item.location}</p>
                          <div style={{ display: 'inline-block', float: 'right', marginTop: 4 }}>
                            <EyeOutlined style={{ verticalAlign: 'middle', marginTop: -1 }} /> {Number(item.views)}
                          </div>
                        </div>
                      </div>
                      <div style={{ float: 'right', paddingBottom: 5, paddingRight: 5 }}>
                        <button
                          class="glow-on-hover"
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
            <AdSection />
          </div >
        )
      }
    </>
  )
}

const Home = () => {
  const mobile = window.innerWidth < 500;
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
      <Space.Compact style={{ float: 'left', paddingBottom:0, width: '100%' }}>
        <div
          style={{
            border: '2px solid rgb(57, 113, 30)',
            height: 32.5,
            padding: 5,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            background: 'rgb(26, 59, 8)',
            // color: 'black'
          }}>
          <span>Filters</span>
        </div>
        <Select
          // defaultValue="active"
          placeholder={'Category'}
          style={{ width: 120 }}
          // onChange={handleChange}
          options={[
            { value: 'active', label: 'ACTIVE' },
            { value: 'dormant', label: 'DORMANT' },
            { value: 'all', label: 'ALL' },
          ]}
        />
        <Select
          // defaultValue="active"
          placeholder={'Price'}
          style={{ width: 120 }}
          // onChange={handleChange}
          options={[
            { value: 'active', label: 'ACTIVE' },
            { value: 'dormant', label: 'DORMANT' },
            { value: 'all', label: 'ALL' },
          ]}
        />
        <Select
          // defaultValue="active"
          placeholder={'Location'}
          style={{ width: 120 }}
          // onChange={handleChange}
          options={[
            { value: 'active', label: 'ACTIVE' },
            { value: 'dormant', label: 'DORMANT' },
            { value: 'all', label: 'ALL' },
          ]}
        />
      </Space.Compact>
      {/* <Selectables /> */}
      {
        shuffleArray(Object.keys(categories)).map((category) => (
          <div style={{ }}>
            <CategoryListing category={category} title={categories[category]} />
          </div>
        ))
      }

    </>
  )
}

export default Home;
