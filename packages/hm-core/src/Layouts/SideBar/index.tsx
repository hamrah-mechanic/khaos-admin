import { Menu } from 'antd';
import { LaptopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type Props = {};

const SidebarMenu = (props: Props) => {
  return (
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }} theme="light">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="/">داشبورد</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<LaptopOutlined />}>
        <Link to="/exhibition">سفارش ها</Link>
      </Menu.Item>
    </Menu>
  );
};

export default SidebarMenu;
