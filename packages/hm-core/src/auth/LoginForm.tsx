import React, { useContext } from 'react';
import { SimpleButton } from 'hm-components';
import { useNavigate } from 'react-router';
import { Card, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { AuthContext } from './AuthContext';
import requestHandler from '../api/requestHandler';

interface FormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  callback?: () => void;
  cardClassName?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ callback, cardClassName }) => {
  const { login, loginRequest } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = async (data: FormData) => {
    try {
      const creds = await loginRequest(data.username, data.password);
      login(creds);
      navigate('/');
      if (callback) callback();
    } catch {}
  };
  const test = () => {
    requestHandler.request.get('https://dev.hamrah-mechanic.com/api/v1/membership/connect/userinfo');
  };

  return (
    <Card className={`${cardClassName} d-flex flex-column`} title="ورود به سیستم">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        <Form.Item name="username" rules={[{ required: true, message: 'نام کاربری را لطفا وارد نمایید!' }]}>
          <Input placeholder="نام کاربری" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'رمز عبور را لطفا وارد نمایید!' }]}
          className="my-4"
        >
          <Input.Password
            placeholder="رمز عبور"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <SimpleButton htmlType="submit" title="ورود" type="primary" block />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
