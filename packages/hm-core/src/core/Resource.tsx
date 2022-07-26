import React, { ComponentType, useContext, useEffect, useState } from 'react';
import { createSearchParams, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import RequireAuth from '../auth/RequireAuth';
import { request } from '../api/requestHandler';
import { ResourceProvider } from './ResourceContext';
import ResourceNavigator from './ResourceNavigator';
import GlobalContext from '../store/GlobalContext';

//HELPERS
import { stringfyObject } from '../helpers';

//TYPES
import { SimpleButtonProps } from 'hm-components';
import { Filters } from '../types';

interface ResourceProps {
  name: string;
  entityName: string;
  sidebarLink: string;
  components?: Array<{
    path: string;
    component: ComponentType;
    button?: SimpleButtonProps;
  }>;
}

const Resource = ({ components, entityName }: ResourceProps) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [searchParams] = useSearchParams();

  const { root, requireAuthentication } = useContext(GlobalContext);
  const [list, setList] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedId, setSelectedId] = useState<number | string>(null);
  const [filters, setFilters] = useState<Filters>({ page: 1, resultsPerPage: 10 });

  useEffect(() => {
    if (searchParams.get('id')) {
      setSelectedId(searchParams.get('id'));
    }
  }, [urlParams]);

  const selectId = (id: number | string): void => {
    setSelectedId(id);
  };

  const create = async (formData): Promise<void> => {
    await request.post(`${root}/${entityName}`, formData);
  };

  const getByFilter = async (filters: Filters): Promise<void> => {
    const { data } = await request.get(`${root}/${entityName}?${createSearchParams(stringfyObject(filters))}`);
    setList(data);
  };

  const getById = async (id: number | string): Promise<void> => {
    const { data } = await request.get(`${root}/${entityName}/${id}`);
    setSelectedItem(data);
  };

  const update = async (formData, id?: number): Promise<void> => {
    await request.put(`${root}/${entityName}/${id ? id : ''}`, formData);
  };

  const remove = async (id: number): Promise<void> => {
    await request.delete(`${root}/${entityName}/${id}`);
  };

  const withPropsComponent = component => {
    return React.cloneElement(component, {
      list,
      selectedItem,
      getById,
      remove,
      selectId,
      selectedId,
      update,
      create,
      entityName,
      navigate,
      filters,
      setFilters,
      getByFilter,
    });
  };

  return (
    <ResourceProvider value={{ list, selectedId }}>
      <>
        <ResourceNavigator
          selectedId={selectedId}
          navigators={components.map(comp => {
            return {
              link: entityName + '/' + comp.path,
              button: comp.button,
              entity: entityName,
            };
          })}
        />
        <RequireAuth requireAuthentication={requireAuthentication}>
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
