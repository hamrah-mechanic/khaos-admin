# Khaos-Admin

A frontend framework containing of tools for fast development of dashboard like projects.

## Tools We Provide

* **Fast Development**: We handle data flow in components using props you wont need to use satate mangers or even requesting data manually 
* **Authentication**: Built-in token-based authentication 
* **Customization**: You will have full control over your components(although we use [antd](https://ant.design/) and recommend using it for faster development)

## Installation

Build a react app with create-react-app or whatever then you can install Khaos using:

```js
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
```js
{ access_token:your_access_token,refresh_token:your_refresh_token }
```
If you implement this successfully you will see access and refresh token as a cookie in your browser. We will add token to header of all requests with this format:
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
      >
      </Khaos>
  );
};

export default App;

```
### Adding Features
To add features to your dashboard you will need to add their entity using resources. Each resource needs the following props:
| Props Name      | Description |
| ----------- | ----------- |
| name      | to show on the sidebar       |
| sidebarLink   | default link(will be used on sidebar)        |
| entityName |will be used for api requests |
| components      | an array of components which are features of your entity       |

components props are like this:
| Props Name      | Description |
| ----------- | ----------- |
| component      | the feature for example shows list or edit or etc...       |
| path      | your custom link for the feature      |
| name      | name of button on navigator bar   |
| button      | button that is showed on navigator bar(uses SimpleButton from Khaos)   |

The components you send to resource will have access to these methods for handling data:
| Props Name      | Description | props |
| ----------- | ----------- | ----------- |
| list      | list of data for example list of users      |
| get      | function for requesting data     |
| listOne      | selected item   |
| remove      | remove an item   |
| selectItem      | select an item   |
| update      | update item   |
| create      | create item   |
| navigate      | navigate between features   |

```js
     <Resource
          name="feature name"
          sidebarLink="list"
          entityName="users"
          components={[
            {
              component: UserShow,
              path: 'show',
              name: 'Show User',
              button: { type: 'info', className: 'mx-1 d-flex align-items-center' },
            },
          ]}
        />
```
### Features Roadmap
![](https://us-central1-progress-markdown.cloudfunctions.net/progress/45)
- [x] Authentication
- [x] Routing
- [ ] Translation
- [ ] Full test Coverage
