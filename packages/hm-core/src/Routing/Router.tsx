import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import RequireAuth from '../auth/RequireAuth';
import Page from '../Layouts/Page';

const Routing = ({ children }: any) => {
  const dynamicRoutes = React.Children.map(children, child => (
    <Route path={child.props.name} element={<RequireAuth>{child}</RequireAuth>} />
  ));
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={children[0]} />
        <Route element={<Page />}>{dynamicRoutes}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
