import { Link } from 'react-router-dom';
const ResourceNavigator = ({ paths }: any) => {
  return (
    <>
      {paths.map(path => (
        <Link key={path} to={path}>
          {path}
        </Link>
      ))}
    </>
  );
};

export default ResourceNavigator;
