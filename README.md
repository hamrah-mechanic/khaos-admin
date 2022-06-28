# Khaos-Admin

A frontend framework containing of tools for fast development of dashboard like projects.

## Tools We Provide

* **Fast Development**: We handle data flow in components using props you wont need to use satate mangers or even requesting data manually 
* **Authentication**: Built-in token-based authentication 
* **Customization**: You will have full control over your components(although we use [antd](https://ant.design/) and recommend using it for faster development)

## Installation

Build a react app with create-react-app or whatever then you can install Khaos using:

```sh
npm install khaos-admin
#or
yarn add khaos-admin
```

## Implementation

### Configuration
In order to make khaos work with your backend api we expect you to follow certain rules. Add your api route to appConfig with root key. You can also set your app configurations such as logo, theme and etc inside appConfig object.

### Authentication
For Authentication you will need two parts.
1. Login page : import Login form from khaos-admin and make your customized login page and send it as props to khaos
2. Providing authentication tokens : You need to implement a function returning access token and refresh token with this format 
```sh
{ access_token:your_access_token,refresh_token:your_refresh_token }
```
If you implement this successfully you will see access and refresh token as a cookie in your browser. We will add token to header of all requests with this format:
```sh
Bearer Your_access_token
```
 On unauthorized request we will request new access using the refresh request function that you provided. 
```sh
import React from 'react';
import { Khaos, Resource } from 'khaos-admin';

const App: React.FC = () => {
  return (
      <Khaos
        login={<Login />}
        loginRequest={loginRequest}
        refreshRequest={renewAccessToken}
        appConfig={{ root: 'https://jsonplaceholder.typicode.com' }}
      >
        <Resource
          name=""
          sidebarLink="list"
          entityName="orders"
          components={[
            { component: OrderList, path: 'list', name: 'لیست سفارش' },
            {
              component: OrderShow,
              path: 'show',
              name: 'نمایش سفارش',
              button: { type: 'info', className: 'mx-1 d-flex align-items-center' },
            },
          ]}
        />
      </Khaos>
  );
};

export default App;

```


### Features Roadmap
![](https://us-central1-progress-markdown.cloudfunctions.net/progress/10)
- [x] Authentication
- [x] Routing
- [ ] Translation
- [ ] Full test Coverage