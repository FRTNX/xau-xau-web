import React from 'react';
import { Badge, Card, Space, Input } from 'antd';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { MdOutlineEmail, MdPassword } from 'react-icons/md'


const App: React.FC = () => (
  <Space direction="vertical" size="middle" style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>

    <Badge.Ribbon text="Welcome" color="green">
      <Card size="small" style={{ color: 'white', background: 'black', border: 'none' }}>
        <p style={{ fontSize: 31 }}>Sign In</p>
        <Space.Compact style={{ width: '70%'}}>
          <MdOutlineEmail  size={40} style={{paddingRight: 10 }} />
          <Input style={{ width: '100%' }} placeholder='Email' size='large' />
        </Space.Compact>
        <Space.Compact style={{ width: '70%', paddingTop: 20}}>
          <MdPassword  size={40} style={{ }} />
          <Input style={{ width: '100%' }} placeholder='Password' size='large' />
        </Space.Compact>
        <div style={{ paddingRight: '15%', paddingTop: 20}}>
          <button style={{ float: 'right'}}>
            Sign In
          </button>
        </div>
        {/* <Space.Compact style={{ width: '70%'}}>
          <MdOutlineEmail  size={40} style={{ }} />
          <Input style={{ width: '100%' }} placeholder='Email' size='large' />
        </Space.Compact> */}
      </Card>
    </Badge.Ribbon>

  </Space>
);

export default App;
