import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import RequireAuth from '../auth/RequireAuth';
import Page from '../layouts/Page';

const Routing = ({ children }: any) => {
  const sideBarItems = [];
  const dynamicRoutes = React.Children.map(children, child => {
    if (child.props.name !== 'login') sideBarItems.push({ name: child.props.name, link: child.props.name });
    return <Route path={child.props.name} element={<RequireAuth>{child}</RequireAuth>} />;
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={children[0]} />
        <Route element={<Page sideBarItems={sideBarItems} />}>{dynamicRoutes}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
