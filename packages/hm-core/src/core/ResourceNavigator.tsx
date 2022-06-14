import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SimpleButton } from 'hm-components';
import { useLocation } from 'react-router-dom';
const ResourceNavigator = ({ navigators, selectedItem }) => {
  const location = useLocation();
  console.log('navigators', navigators);
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
