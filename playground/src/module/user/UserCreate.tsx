import React from 'react';
import { SimpleButton } from 'hm-components';
import { Form, Input } from 'antd';

const UserCreate = ({ create, entityName, navigate }) => {
  const formFields = [
    {
      placeholder: 'نام و نام خانوادگی',
      name: 'name',
      rules: [{ required: true, message: 'پر کردن این فیلد الزامی است' }],
    },
    {
      placeholder: 'نام کاربری',
      name: 'username',
      rules: [{ required: true, message: 'پر کردن این فیلد الزامی است' }],
    },
    {
      placeholder: 'ایمیل',
      name: 'email',
      rules: [{ required: true, message: 'پر کردن این فیلد الزامی است' }],
    },
    {
      placeholder: 'آدرس',
      name: 'address',
    },
    {
      placeholder: 'تلفن',
      name: 'phone',
      rules: [{ required: true, message: 'پر کردن این فیلد الزامی است' }],
    },
    {
      placeholder: 'وب سایت',
      name: 'website',
    },
    {
      placeholder: 'شرکت',
      name: 'company',
    },
  ];

  const handleCreate = data => {
    create(data);
    navigate(`/${entityName}/list`);
  };

  return (
    <Form className="my-3" name="basic" initialValues={{ remember: true }} onFinish={handleCreate} autoComplete="on">
      {formFields.map(field => (
        <Form.Item key={field.name} name={field.name} rules={field.rules}>
          <Input placeholder={field.placeholder} />
        </Form.Item>
      ))}
      <Form.Item>
        <SimpleButton htmlType="submit" title="ثبت" type="primary" block />
      </Form.Item>
    </Form>
  );
};

export default UserCreate;
