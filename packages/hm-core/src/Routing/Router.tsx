import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from '../layouts/Page';

const Routing = ({ children, login }: any) => {
  const sideBarItems = React.Children.map(children, child => {
    return { name: child.props.name, link: child.props.sidebarLink };
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={login} />
        <Route path="/*" element={<Page sideBarItems={sideBarItems}>{children}</Page>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routing;
