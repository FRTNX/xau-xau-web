// @ts-nocheck
import { useEffect, useState } from "react";
import { Row, Col, Space, Select } from "antd";

import config from "./config/config";

import { fetchProducts, fetchCategories } from "./api/product.api";

import { MdLocationPin, MdPriceChange } from "react-icons/md";
import { EyeOutlined } from "@ant-design/icons";

import { formatPrice, shuffleArray } from "./utils";

import { ScaleLoader } from 'react-spinners';
import { Fade } from "react-awesome-reveal";

import Loader from "./Loader";

import "./components/fancy-buttons/hover.glow.css";
import './xau.css';

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
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    populateProducts();
  }, []);

  const populateProducts = async () => {
    const params = {
      category,
      limit: 4,
      status: 'AV'
    }
    const result = await fetchProducts(params);
    if (result) {
      setItems(result);
      setLoaded(true)
    }
  };

  return (
    <>
      {
        items.length > 0 && (
          <div style={{ verticalAlign: 'top', width: '100%', paddingTop: 40 }}>
            <Fade triggerOnce>
              <p
                className="glowing-text"
                style={{
                  fontSize: mobile ? 27 : 25,
                  fontFamily: 'X',
                  // color: 'rgb(130, 124, 48)',
                  marginBottom: 5,
                }}
              >{title}</p>
            </Fade>
            {/* <Fade cascade direction={mobile ? 'up' : ''} triggerOnce> */}
              <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 17 }, 18]}>
                {
                  items.map((item, index) => (
                    <Col xs={24} sm={12} md={12} lg={12} xl={6}>

                      <div style={{ background: 'linear-gradient(rgb(112, 114, 115), black 50%)', height: '100%', padding: 0, borderRadius: 5, }} key={index}>
                        <img
                          onClick={() => window.location.href = `/product/${item._id}`}
                          src={baseUrl + `?id=${item._id}`}
                          width={'100%'}
                          height={238}
                          style={{ objectFit: 'cover', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                          loading="lazy"
                        />
                        <div style={{ lineHeight: 1, padding: 5, marginTop: -20 }}>
                          <p
                            style={{
                              fontSize: mobile ? 16 : 17,
                              fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                              color: 'rgb(180, 182, 179)'
                            }}
                          >
                            {formatString(item.name, 64)}
                          </p>
                          <p
                            style={{
                              marginTop: -11,
                              fontSize: mobile ? 14 : 15,
                              padding: 5,
                              paddingLeft: 2,
                              borderRadius: 5
                            }}
                          >
                            {item.currency}{" "}{formatPrice(item.price)} <MdPriceChange style={{ color: 'rgb(117, 170, 106)' }} />
                          </p>
                          <div style={{ display: 'inline-block', width: '70%', marginTop: -18 }}>
                            <p style={{ color: 'grey' }}><MdLocationPin style={{ marginTop: -10, marginBottom: -2, color: 'green' }} />{item.location}</p>
                            <div style={{ marginTop: 4, paddingLeft: mobile ? 2 : 1 }}>
                              <EyeOutlined style={{ verticalAlign: 'middle', marginTop: -1, color: 'grey' }} /> {Number(item.views)}
                            </div>
                          </div>
                          <div style={{ display: 'inline-block', right: mobile ? 8 : 13, position: 'absolute', bottom: 5 }}>
                            <button
                              className="glow-on-hover"
                              style={{ borderRadius: 0 }}
                              onClick={() => window.location.href = `/product/${item._id}`}
                            >
                              view
                            </button>
                          </div>
                        </div>
                      </div>

                    </Col>
                  ))
                }
              </Row>
            <br />
            <AdSection />
            {/* </Fade> */}
          </div >
        )
      }
    </>
  )
}

const Home = () => {
  const mobile = window.innerWidth < 500;
  const [categories, setCategories] = useState({});
  const [categoryOptions, setCategoryOptions] = useState<Object>([])

  useEffect(() => {
    populateCategories();
  }, []);

  const populateCategories = async () => {
    const result = await fetchCategories();
    console.log('categories from server:', result)
    if (result) {
      setCategories(result);
      const options = Object.keys(result).map((category) => ({ value: category, label: result[category] }))
      console.log('assembled cat options:', options)
      setCategoryOptions(options)
    }
  }

  return (
    <div style={{ minHeight: '80vh' }}>
      <Space.Compact style={{ float: 'left', paddingBottom: 0, width: '100%' }}>
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
          options={categoryOptions}
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
        Object.keys(categories).length === 0 && (
          <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: 200 }}>
            <ScaleLoader color='white' />
            <p>Loading Products</p>
          </div>
        )
      }
      {
        shuffleArray(Object.keys(categories)).map((category) => (
          <div style={{}}>
            <CategoryListing category={category} title={categories[category]} />
          </div>
        ))
      }
    </div>
  )
}

export default Home;
