import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

type Props = {
  items: Array<{ name: string; link: string }>;
};

const SidebarMenu = ({ items }: Props) => {
  const defaultSelectedKey = items.findIndex(item => window.location.pathname === '/' + item.link);
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[defaultSelectedKey.toString()]}
      style={{ height: '100%', borderRight: 0 }}
      theme="light"
    >
      {items.map(({ link, name }, index) => (
        <Menu.Item key={index} className="text-right">
          <Link to={link}>{name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SidebarMenu;
