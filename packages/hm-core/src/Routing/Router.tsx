import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import React from 'react';
import RequireAuth from '../auth/RequireAuth';

const Routing = ({ children }: any) => {
  const dynamicRoutes = React.Children.map(children, child => <Route path={child.props.name} element={child} />);
  return (
    <BrowserRouter>
      <Routes>{dynamicRoutes}</Routes>
    </BrowserRouter>
  );
};

export default Routing;
