import React from 'react';
import { Khaos, Resource } from 'khaos-admin';
import Login from './auth/Login';
import { renewAccessToken, loginRequest } from './auth/api';
import { ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UserCreate, UserEdit, UserList } from './module/user';
import { OrderList } from './module/order';

import logo from './assets/hm-logo/new-logo.svg';

const App: React.FC = () => {
  return (
    <ConfigProvider direction="rtl">
      <Khaos
        login={<Login />}
        loginRequest={loginRequest}
        refreshRequest={renewAccessToken}
        appConfig={{ root: 'https://dev.hamrah-mechanic.com/api/v1/admin', logo }}
      >
        {/* <Resource
          name="لیست کاربران"
          sidebarLink="list"
          entityName="users"
          components={[
            { component: UserList, path: 'list', name: 'لیست کاربران' },
            {
              component: UserEdit,
              path: 'edit',
              name: 'ویرایش',
              button: { type: 'primary', className: 'mx-1 d-flex align-items-center' },
            },
            {
              component: UserCreate,
              path: 'create',
              name: 'ایجاد',
              button: {
                type: 'success',
                icon: <PlusOutlined />,
                ghost: true,
                className: 'mx-1 d-flex align-items-center',
              },
            },
          ]}
        /> */}
        <Resource
          name="لیست سفارش ها"
          sidebarLink=""
          entityName="sellorder/orders"
          components={[{ component: OrderList, path: '/', name: 'لیست سفارش' }]}
        />
      </Khaos>
    </ConfigProvider>
  );
};

export default App;
