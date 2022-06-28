import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from '../layouts/Page';

interface RoutingProps {
  login: React.ReactNode;
  children: ReactElement;
}
//TODO check if there is children then map so it wont error on empty project for both sidebar and resources
const Routing = ({ children, login }: RoutingProps) => {
  const sideBarItems = React.Children.map(children, child => {
    return { name: child.props.name, link: `${child.props.entityName}/${child.props.sidebarLink}` };
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={login} />
        <Route
          path="/"
          element={
            <Page sideBarItems={sideBarItems}>
              <div>home</div>
            </Page>
          }
        />
        <Route path="/*" element={<Page sideBarItems={sideBarItems}>{children}</Page>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
