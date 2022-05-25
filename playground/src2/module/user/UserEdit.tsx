import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SimpleButton } from 'hm-components';
import { Form, Input } from 'antd';

const UserEdit = ({ selectedItem: id, update, entityName }) => {
  const navigate = useNavigate();

  useEffect(() => {
    !id && navigate(`/${entityName}/list`);
  }, [id]);

  const submitHandle = data => {
    update(id, { ...data });
    navigate(`/${entityName}/list`);
  };

  return (
    id && (
      <Form className="my-3" name="basic" initialValues={{ remember: true }} onFinish={submitHandle} autoComplete="on">
        <Form.Item name="name">
          <Input placeholder="نام و نام خانوادگی" />
        </Form.Item>
        <Form.Item name="username">
          <Input placeholder="نام کاربری جدید" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="ایمیل جدید" />
        </Form.Item>
        <Form.Item>
          <SimpleButton htmlType="submit" title="ذخیره" type="primary" block />
        </Form.Item>
      </Form>
    )
  );
};

export default UserEdit;
