import { useEffect, useState } from "react";
import defaultImg from './assets/images/1.jpg';

import MainLayout from "./MainLayout";

import './xau.css'

const Section = () => {
  const [items, setItems] = useState([
    {
      img: defaultImg,
      name: 'Acer Laptop',
      price: 150,
      currency: 'USD$',
      location: 'Harare'
    },
  ])

  if (3 < 1) {
    setItems(items)
  }

  useEffect(() => {
    console.log('vanity')
  })

  return (
    <>
      <div style={{ verticalAlign: 'top', width: '100%' }}>
        <p>Electronics</p>
        <div>
          {
            items.map((item, index) => (
              <div style={{ width: 300}} key={index}>
                <img src={defaultImg} width={300} />
                <div style={{ lineHeight: 0 }}>
                  <div>
                    <p style={{ display: 'inline-block'}}>{item.name}</p>
                    <p style={{ display: 'inline-block', float: 'right'}}>{item.currency}{" "}{Number(item.price).toFixed(2)}</p>
                  </div>
                  <p>{item.location}</p>
                </div>
                <div style={{ float: 'right'}}>
                  <button>
                    view
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

const App = () => {

  return (
    <MainLayout>
      <Section />
    </MainLayout>
  )
}

export default App;
