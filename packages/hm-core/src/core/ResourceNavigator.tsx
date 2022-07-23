import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleButton } from 'hm-components';
import { useLocation } from 'react-router-dom';
// import { SimpleButtonProps } from 'hm-components';

//TYPES
interface ResourceNavigatorProps<T> {
  navigators: {
    link: string;
    button: any;
    entity: string;
  }[];
  selectedId: T;
}

const ResourceNavigator = <T,>({ navigators, selectedId }: ResourceNavigatorProps<T>) => {
  const location = useLocation();
  const setRouteId = navigator => {
    return navigator.link + '?id=' + selectedId;
  };
  if (location.pathname.includes(navigators[0].entity))
    return (
      <div className="d-flex">
        {navigators.map(
          navigator =>
            navigator.button && (
              <Link key={navigator.link} to={setRouteId(navigator)}>
                <SimpleButton title={navigator.button.name} {...navigator.button} />
              </Link>
            ),
        )}
      </div>
    );
  return null;
};

export default ResourceNavigator;
