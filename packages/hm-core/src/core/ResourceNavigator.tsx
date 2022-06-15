import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleButton } from 'hm-components';
import { useLocation } from 'react-router-dom';
import { SimpleButtonProps } from 'hm-components';

//TYPES
interface ResourceNavigatorProps {
  navigators: {
    name: string;
    link: string;
    button: SimpleButtonProps;
    entity: string;
  }[];
  selectedItem: number;
}
const ResourceNavigator: React.FC<ResourceNavigatorProps> = ({ navigators, selectedItem }) => {
  const location = useLocation();
  const setRouteId = navigator => {
    if (navigator.link.includes(':id')) {
      return navigator.link.replace(':id', '') + selectedItem;
    }
    return navigator.link;
  };
  if (location.pathname.includes(navigators[0].entity))
    return (
      <div className="d-flex">
        {navigators.map(
          navigator =>
            navigator.button && (
              <Link key={navigator.link} to={setRouteId(navigator)}>
                <SimpleButton title={navigator.name} {...navigator.button} />
              </Link>
            ),
        )}
      </div>
    );
  return null;
};

export default ResourceNavigator;
