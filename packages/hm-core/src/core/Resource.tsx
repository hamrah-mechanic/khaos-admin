import React, { ComponentType, useContext, useEffect, useState } from 'react';
import { Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import RequireAuth from '../auth/RequireAuth';
import { request } from '../api/requestHandler';
import { ResourceProvider } from './ResourceContext';
import ResourceNavigator from './ResourceNavigator';
import GlobalContext from '../store/GlobalContext';

//TYPES
import { SimpleButtonProps } from 'hm-components';

//TYPES
interface ResourceProps {
  name: string;
  entityName: string;
  sidebarLink: string;
  components?: Array<{
    path: string;
    component: ComponentType;
    name: string;
    button?: SimpleButtonProps;
  }>;
}

const Resource = ({ components, entityName }: ResourceProps) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { root } = useContext(GlobalContext);
  const [list, setList] = useState([]);
  const [listOne, setListOne] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (searchParams.get('id')) {
      setSelectedItem(searchParams.get('id'));
    }
  }, [urlParams]);

  const selectItem = (item: number): void => {
    setSelectedItem(item);
  };

  const create = async (formData): Promise<void> => {
    const { data } = await request.post(`${root}/${entityName}`, formData);
    setList([...list, data]);
  };

  const get = async (page: number, resultsPerPage: number, id: number): Promise<void> => {
    if (id) {
      const { data } = await request.get(`${root}/${entityName}/${id}`);
      setListOne(data as Array<any>);
    } else {
      const { data } = await request.get(`${root}/${entityName}?page=${page}&resultsPerPage=${resultsPerPage}`);
      setList(data as Array<any>);
    }
  };

  const update = async (formData, id?: number): Promise<void> => {
    const { data } = await request.put(`${root}/${entityName}/${id ? id : ''}`, formData);
    setList(list.map(item => (item.id === id ? { ...item, ...data } : item)));
  };

  const remove = async (id: number): Promise<void> => {
    await request.delete(`${root}/${entityName}/${id}`);
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
    <ResourceProvider value={{ list, selectedItem }}>
      <>
        <ResourceNavigator
          selectedItem={selectedItem}
          navigators={components.map(comp => {
            return {
              name: comp.name,
              link: entityName + '/' + comp.path,
              button: comp.button,
              entity: entityName,
            };
          })}
        />
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
