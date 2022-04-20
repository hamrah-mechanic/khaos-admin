import { Card, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { SimpleButton } from 'hm-components';

interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const onFinish = (data: FormData) => {
    console.log(data);
  };

  return (
    <Card className="d-flex align-items-center flex-column" title="ورود به سیستم">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
