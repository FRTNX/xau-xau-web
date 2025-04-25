// @ts-nocheck
import { useState } from "react";
import { Input, Form } from "antd";

const { TextArea } = Input;

import { Fade } from "react-awesome-reveal";

const MessageBox = () => {
  const [msgData, setMsgData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const handleChange = (name, event) => {
    console.log(msgData)
    setMsgData({ ...msgData, [name]: event.target.value });
  }

  const submit = async () => {
    const params = {
      product: {
        id: data._id
      },
      customer: {
        name: msgData.name,
        contact: msgData.contact,
        message: msgData.message
      }
    };

    console.log('sending params:', params)

    const result = await productEmail(params);
    console.log('email send result:', result)
  }


  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Fade direction="up" cascade>
          <Form.Item label="Name">
            <Input
              value={msgData.name}
              placeholder='Your Name'
              onChange={(e) => handleChange('name', e)}
            />
          </Form.Item>
          <Form.Item label="Contact Detail">
            <Input placeholder='Phone Number or Email Address' onChange={(e) => handleChange('contact', e)} />
          </Form.Item>
          <Form.Item label="Message">
            <TextArea placeholder="Message" autoSize style={{ minHeight: 100 }} onChange={(e) => handleChange('message', e)} />
          </Form.Item>
          <div style={{ float: 'right' }}>
            <button style={{ background: 'rgb(32, 75, 32)' }} onClick={submit}>
              Send
            </button>
          </div>
        </Fade>

      </Form>
    </>
  )
}

export default MessageBox;