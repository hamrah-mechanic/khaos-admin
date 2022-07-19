import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ButtonProps, Card, Form, FormItemProps, Input, InputProps } from 'antd';
import { SimpleButton } from 'hm-components';
import { AuthContext } from './AuthContext';

interface FormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  fields: InputProps[] | FormItemProps[];
  buttons: ButtonProps[];
  defaultRoute?: string;
  cardClassName?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ fields, buttons, defaultRoute = '/', cardClassName }) => {
  const { login, loginRequest } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (data: FormData) => {
    try {
      const creds = await loginRequest(data.username, data.password);
      login(creds);
      navigate(defaultRoute);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${cardClassName} d-flex flex-column`} title="ورود به سیستم">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        {fields.map(field => (
          <Form.Item key={field.name} name={field.name} rules={field.rules} className={field.className}>
            {field.type === 'password' ? (
              <Input.Password placeholder={field.placeholder} iconRender={field.iconRender} />
            ) : (
              <Input type={field.type} placeholder={field.placeholder} {...field} />
            )}
          </Form.Item>
        ))}
        {buttons.map(btn => (
          <Form.Item key={btn.title}>
            <SimpleButton htmlType={btn.htmlType} title={btn.title} type={btn.type} {...btn} />
          </Form.Item>
        ))}
      </Form>
    </Card>
  );
};

export default LoginForm;
