import React, { ComponentType, ReactElement, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../auth/RequireAuth';
import request from '../api/requestHandler';
import { AuthContext } from '../auth/AuthContext';
import { ResourceProvider } from './ResourceContext';
import ResourceNavigator from './ResourceNavigator';

interface ResourceProps {
  name?: string;
  contextName?: string;
  components?: Array<{ path: string; component: any }>;
  crud?: ReactElement | ComponentType<any>;
  children?: any;
}

const Resource: React.FC<ResourceProps> = ({ children, components, name }) => {
  //FIXME array of components
  //FIXME: change to global context
  const { dataProvider } = useContext(AuthContext);
  const [list, setList] = useState({});

  const withPropsComponent = component => {
    return React.cloneElement(component, { usersList: list });
  };

  useEffect(() => {
    show();
  }, []);

  const create = () => {
    return null;
  };

  const show = async () => {
    const { data } = await request.request.get(`${dataProvider}/users`);
    setList(data);
  };
  const update = () => {
    return null;
  };

  const remove = () => {
    return null;
  };

  return (
    <ResourceProvider value={{ list }}>
      <>
        <ResourceNavigator paths={components.map(comp => comp.path)} />
        <RequireAuth>
          <Routes>
            {components.map(component => {
              const { path, component: Compo } = component;
              return <Route key={path} path={path} element={withPropsComponent(<Compo />)} />;
            })}
          </Routes>
        </RequireAuth>
      </>
    </ResourceProvider>
  );
};

export default Resource;
