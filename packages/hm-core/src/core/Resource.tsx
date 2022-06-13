import { Route, Routes, useLocation } from 'react-router-dom';
import React, { ComponentType, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import RequireAuth from '../auth/RequireAuth';
import request from '../api/requestHandler';
import { ResourceProvider } from './ResourceContext';
import ResourceNavigator from './ResourceNavigator';
import GlobalContext from '../store/GlobalContext';

//TYPES
import { SimpleButtonProps } from 'hm-components/src/components/buttons/SimpleButton';

interface ResourceProps {
  name: string;
  entityName: string;
  sidebarLink: string;
  components?: Array<{ path: string; component: ComponentType; name: string; button?: SimpleButtonProps }>;
}

const Resource: React.FC<ResourceProps> = ({ components, entityName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { root } = useContext(GlobalContext);
  const [list, setList] = useState([]);
  const [listOne, setListOne] = useState([]);
  const [total, setTotal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const selectItem = item => {
    setSelectedItem(item);
  };

  const create = async formData => {
    const { data } = await request.request.post(`${root}/${entityName}`, formData);
    setList([...list, data]);
  };

  const get = async (page: number, resultsPerPage: number, id: number) => {
    if (id) {
      const { data } = await request.request.get(`${root}/${entityName}/${id}`);
      setListOne(data as Array<any>);
    } else {
      const { data } = await request.request.get(`${root}/${entityName}?page=${page}&resultsPerPage=${resultsPerPage}`);
      //FIXME: correct types from backend api instead any
      setList(data as Array<any>);
    }
  };

  const update = async (id, formData) => {
    const { data } = await request.request.put(`${root}/${entityName}/${id}`, formData);
    setList(list.map(item => (item.id === id ? { ...item, ...data } : item)));
  };

  const remove = async id => {
    await request.request.delete(`${root}/${entityName}/${id}`);
    setList(list.filter(item => item.id !== id));
  };

  const withPropsComponent = component => {
    return React.cloneElement(component, {
      list,
      listOne,
      get,
      remove,
      selectItem,
      selectedItem,
      update,
      create,
      entityName,
      navigate,
    });
  };

  return (
    <ResourceProvider value={{ list }}>
      <>
        {location.pathname !== '/' && (
          <ResourceNavigator
            navigators={components.map(comp => {
              return {
                name: comp.name,
                link: entityName + '/' + comp.path,
                button: comp.button,
              };
            })}
          />
        )}
        <RequireAuth>
          <Routes>
            {components.map(component => {
              const { path, component: Compo } = component;
              return <Route key={path} path={entityName + '/' + path} element={withPropsComponent(<Compo />)} />;
            })}
          </Routes>
        </RequireAuth>
      </>
    </ResourceProvider>
  );
};

export default Resource;
