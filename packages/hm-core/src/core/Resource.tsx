interface ResourceProps {
  name: string;
  create?: React.ReactNode;
  read?: React.ReactNode;
  update?: React.ReactNode;
}

const Resource: React.FC<ResourceProps> = ({ name, create, read, update }) => {
  return null;
};

export default Resource;
