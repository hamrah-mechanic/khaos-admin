import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleButton, SimpleButtonProps } from 'hm-components';

interface ResourceNavigatorProps {
  navigators: {
    name: string;
    link: string;
    button: SimpleButtonProps;
  }[];
}

const ResourceNavigator: React.FC<ResourceNavigatorProps> = ({ navigators }) => {
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
