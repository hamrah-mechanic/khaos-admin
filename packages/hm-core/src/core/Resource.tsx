import React, { ComponentType, ReactElement, Children, useContext, useEffect, useState } from 'react';
import request from '../api/requestHandler';
import { AuthContext } from '../auth/AuthContext';
import { ResourceProvider, ResorceContext } from './ResourceContext';

interface ResourceProps {
  name?: string;
  contextName?: any;
  crud?: ReactElement | ComponentType<any>;
  children?: any;
}

const Resource: React.FC<ResourceProps> = ({ contextName, children }) => {
  //FIXME: change to global context
  const { dataProvider } = useContext(AuthContext);
  console.log('route', dataProvider);
  const [list, setList] = useState({});
  const childrenResource = Children.map(children, child => {
    return React.cloneElement(child, { usersList: list });
  });

  useEffect(() => {
    show();
  }, []);

  const create = () => {
    return null;
  };

  const show = async () => {
    const { data } = await request.request.get(`${dataProvider}/users`);
    console.log(data);
    setList(data);
  };
  const update = () => {
    return null;
  };

  const remove = () => {
    return null;
  };

  return <ResourceProvider value={{ list }}>{childrenResource}</ResourceProvider>;
};

export default Resource;
