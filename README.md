# Khaos-Admin

A frontend framework containing of tools for fast development of dashboard, panel, etc.

## Tools We Provide

- **Fast Development**: We handle data flow in components using props, you won't need to use state managers or even requesting data manually.
- **Authentication**: Built-in token-based authentication.
- **Customization**: You will have a full control over your components(although we use [antd](https://ant.design/) and recommend using it for faster development)

## Installation

Build a react app with create-react-app or whatever then you can install Khaos Admin using:

```js
npm install khaos-admin
#or
yarn add khaos-admin
```

## Implementation

### API Configuration

In order to make khaos work with your backend API, we expect you to follow certain rules. Add your API route to `appConfig` with `root` key.<br/> You can also set your app configurations such as `logo`, `theme`, etc., inside `appConfig` prop.<br />
The URL structure you need to implement consists of root URL which you should set inside the `appConfig` prop for each entity. `entityName` will be used to request data for that entity. For example if you have an API for your users you should use `users` for `entityName` prop of the resource and we will use `YourRootURL/users` to get the data for that compoenent.

### Authentication

For Authentication you will need two parts.

1. Login page : import Login form from khaos-admin and make your customized login page and you.
   Or you can create your custom login page and pass it as props to `login`, but you should import `authenticate()` from khaos-admin.
   For authentication you should pass `access token` and `referesh token` and `expiration` (optional) as parameter to `authenticate()` function.

2. Providing authentication tokens : You need to implement a function returning access token and refresh token with this format.

```js
{ access_token:your_access_token,refresh_token:your_refresh_token }
```

If you implement this successfully you will see access token and refresh token as a cookie in your browser. We will add token to header of all requests with this format:
`Bearer Your_access_token`
On unauthorized request we will request new access using the refresh request function that you provided.

```js
import React from 'react';
import { Khaos, Resource } from 'khaos-admin';

const App: React.FC = () => {
  return (
    <Khaos
      login={<Login />}
      loginRequest={loginRequest}
      refreshRequest={renewAccessToken}
      appConfig={{ root: 'https://jsonplaceholder.typicode.com' }}
    ></Khaos>
  );
};

export default App;
```

> ##### Note:
>
> If you want right to left body `(rtl)`, you should follow tow steps:
> 
>
> ###### 1)
>
> In your app code add:
>
> ```js
> import { ConfigProvider } from 'antd';
>
> <ConfigProvider direction="rtl">
>   <Khaos {...props}>
> </ConfigProvider>`
> ```
>
> ###### 2)
>
> In your css code add:
>
> ```css
> body {
>   direction: rtl;
> }
> ```

### Login Customization

We provided a default form for login page. as we told before, you can create custom login form or you can import `<LoginForm>` from khaos-admin and customize it via some props as following:

| Props Name    | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| defaultRoute  | navigate to custom route after submiting login (default = '/')     |
| cardClassName | custom classname for form in login page                            |
| userNameProps | [custom props for userName input](#custom-props)                   |
| passwordProps | [custom props for password input](#custom-props)                   |
| buttonProps   | custom props for submit button (use`SimpleButtonProps` from khaos) |

#### Custom Props

For `userNameProps` and `passwordProps` you can pass these props(optional):
| Props Name | Description |
| ----------- | ----------- |
| name | optional props for name of fields |
| rules | custom rules for validation |
| placholder | custom placeholder for fields |
| label | custom label for fields |
| className | custom classname for styling fields |

`passwordProps` has another props more:
| Props Name | Description |
| ----------- | ----------- |
| iconrender | to rendering custom icon for password field (e.g: visibility) |

### Adding Features

To add features to your dashboard you will need to add their entity using resources. Each resource needs the following props:
| Props Name | Description |
| ----------- | ----------- |
| label | to show on the sidebar |
| sidebarLink | default link(will be used on sidebar to show your landing component for that feature) |
| entityName |will be used for API requests |
| components | an array of components which are features of your entity |

Components props are like this:
| Props Name | Description |
| ----------- | ----------- |
| component | the feature for example shows list or edit or etc... |
| path | your custom link for the feature |
| button | button that is showed on navigator bar(uses SimpleButton from Khaos) |

The components you send to resource will have access to these methods and objects for handling data:
| Props Name | Description | props |
| ----------- | ----------- | ----------- |
| list | list of data for example list of users |
| get | function for requesting data |
| selectedItem | selected item from list | item you selected in the list
| remove | remove an item |
| selectedId | selected id |
| selectId | select an id |
| update | update item |
| create | create item |
| navigate | navigate between features |

For example the example below is a resource that you can use to show a list of users.

```js
import { Resource } from 'khaos-admin';

<Resource
  label="feature name"
  sidebarLink="list"
  entityName="users"
  components={[
    {
      component: UserList,
      path: 'list',
      button: { name: 'User List', type: 'info', className: 'mx-1 d-flex align-items-center' },
    },
  ]}
/>;
```

> ##### Note: 
> `sidebarLink` is the default feature for this entity. e.g: in most cases you will show your list of that entity.
> For this feature to work, you need to set same path for both `sidebarLink` and `path` prop for your listing component.


for list request we expect you to return list of data, for example users and the total results with the key totalResults.
And the `UserList` component will be like this:

```js
const UserList = ({ list }) => {
  console.log('here you have access to list of whatever entity you are in', list);
  return <div>List of users </div>;
};
```

### Features Roadmap

![](https://us-central1-progress-markdown.cloudfunctions.net/progress/45)

- [x] Authentication
- [x] Routing
- [ ] Translation
- [ ] Full test Coverage
