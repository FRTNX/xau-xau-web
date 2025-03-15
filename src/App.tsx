import { useEffect, useState } from "react";
import defaultImg from './assets/images/1.jpg';

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

  return (
    <>
      <div style={{ verticalAlign: 'top', width: '100%' }}>
        <p>Electronics</p>
        <div>
          {
            items.map((item, index) => (
              <div style={{ width: 300}}>
                <img src={defaultImg} width={300} />
                <div style={{ lineHeight: 0 }}>
                  <div>
                    <p style={{ display: 'inline-block'}}>{item.name}</p>
                    <p style={{ display: 'inline-block', float: 'right'}}>{item.currency}{" "}{Number(item.price).toFixed(2)}</p>
                  </div>
                  <p>{item.location}</p>
                </div>
                <div>

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
    <>
      <header style={{ position: 'fixed', top: 0, borderBottom: '2px solid white', width: '100%', paddingTop: 5, paddingBottom: 5 }}>
        <p style={{ paddingLeft: 15, fontSize: 30, lineHeight: 0 }}>xau-xau</p>
      </header>
      <main style={{ width: 1200, marginLeft: 'auto', marginRight: 'auto', position: 'relative', top: 62 }}>
        <Section />
      </main>
    </>
  )
}

export default App;
