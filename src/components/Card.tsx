import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch } from 'antd';

const { Meta } = Card;

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

const GridCard: React.FC = () => (
  <Card title="Card Title">
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid hoverable={false} style={gridStyle}>
      Content
    </Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>
);

const Card01: React.FC = () => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
);

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Flex gap="middle" align="start" vertical>
      <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
      <Card loading={loading} actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title="Card title"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
      <Card loading={loading} actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
          title="Card title"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>
      <br />
      <Card01 />
      <br />
      <GridCard />
    </Flex>
  );
};

export default App;