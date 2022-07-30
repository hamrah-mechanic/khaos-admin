import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Card, Form, Input } from 'antd';
import { SimpleButton, SimpleButtonProps } from 'hm-components';
import { AuthContext } from './AuthContext';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Rule } from 'antd/lib/form';
import { TokenType } from '../types';
interface FormData {
  username: string;
  password: string;
}

interface FieldProps {
  name?: string;
  rules?: Rule[];
  placeholder?: string;
  label?: string;
  className?: string;
}

interface PasswordFieldProps extends FieldProps {
  iconRender?: (visible: boolean) => React.ReactNode;
}

interface LoginFormProps {
  userNameProps?: FieldProps;
  passwordProps?: PasswordFieldProps;
  defaultRoute?: string;
  cardClassName?: string;
  buttonProps?: SimpleButtonProps;
}

const LoginForm: React.FC<LoginFormProps> = ({
  userNameProps,
  passwordProps,
  defaultRoute = '/',
  cardClassName,
  buttonProps = { title: 'login', type: 'primary', block: true, htmlType: 'submit' },
}) => {
  const {
    name: userName,
    rules: userRules,
    placeholder: userPlaceholder,
    className: userClassName,
  } = userNameProps || {};
  const {
    name,
    rules,
    placeholder,
    iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />),
    className,
  } = passwordProps || {};
  const { login, loginRequest } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (data: FormData) => {
    try {
      const creds = (await loginRequest(data.username, data.password)) as TokenType;
      login(creds);
      navigate(defaultRoute);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${cardClassName} d-flex flex-column`} title="ورود به سیستم">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        <Form.Item
          name={userName || 'username'}
          rules={userRules || [{ required: true, message: 'Please enter username!' }]}
          className={userClassName}
        >
          <Input placeholder={userPlaceholder || 'Username'} />
        </Form.Item>
        <Form.Item
          name={name || 'password'}
          rules={rules || [{ required: true, message: 'Please enter password!' }]}
          className={className || 'my-4'}
        >
          <Input.Password placeholder={placeholder || 'Password'} iconRender={iconRender} />
        </Form.Item>
        <Form.Item>
          <SimpleButton {...buttonProps} />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
