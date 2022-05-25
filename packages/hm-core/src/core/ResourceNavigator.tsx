import { SimpleButton } from 'hm-components';
import { Link } from 'react-router-dom';
import React from 'react';

const ResourceNavigator = ({ navigators }) => {
  return (
    <div className="d-flex">
      {navigators.map(
        navigator =>
          navigator.button && (
            <Link key={navigator.link} to={navigator.link}>
              <SimpleButton title={navigator.name} {...navigator.button} />
            </Link>
          ),
      )}
    </div>
  );
};

export default ResourceNavigator;
