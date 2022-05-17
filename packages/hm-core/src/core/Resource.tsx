import React, { ComponentType, useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../auth/RequireAuth';
import { ButtonProps } from 'antd';
import request from '../api/requestHandler';
import { ResourceProvider } from './ResourceContext';
import ResourceNavigator from './ResourceNavigator';
import GlobalContext from '../store/GlobalContext';
GlobalContext;
interface ResourceProps {
  name: string;
  sidebarLink: string;
  contextName?: string;
  components?: Array<{ path: string; component: ComponentType; name: string; button?: ButtonProps }>;
}

const Resource: React.FC<ResourceProps> = ({ components, name }) => {
  //FIXME array of components
  //FIXME: change to global context
  const { root } = useContext(GlobalContext);
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    show();
  }, []);

  const selectItem = item => {
    setSelectedItem(item);
  };

  const create = async formData => {
    const { data } = await request.request.post(`${root}/users`, formData);
    setList([...list, data]);
  };

  const show = async () => {
    const { data } = await request.request.get(`${root}/users`);
    //FIXME: correct types from backend api instead any
    setList(data as Array<any>);
  };

  const update = async (id, formData) => {
    const { data } = await request.request.put(`${root}/users/${id}`, formData);
    setList(list.map(item => (item.id === id ? { ...item, ...data } : item)));
  };

  const remove = async id => {
    await request.request.delete(`${root}/users/${id}`);
    setList(list.filter(item => item.id !== id));
  };

  const withPropsComponent = component => {
    return React.cloneElement(component, { usersList: list, remove, selectItem, selectedItem, update, create });
  };

  return (
    <ResourceProvider value={{ list }}>
      <>
        <ResourceNavigator
          navigators={components.map(comp => {
            return {
              name: comp.name,
              link: comp.path,
              button: comp.button,
            };
          })}
        />
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
