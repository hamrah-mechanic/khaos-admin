import { Menu } from 'antd';
import { Link } from 'react-router-dom';

type Props = {
  items: Array<{ name: string; link: string }>;
};

const SidebarMenu = ({ items }: Props) => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }} theme="light">
      {items.map(({ link, name }, index) => (
        <Menu.Item key={index}>
          <Link to={link}>{name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
