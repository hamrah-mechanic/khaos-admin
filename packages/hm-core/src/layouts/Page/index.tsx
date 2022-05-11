import React from 'react';

//STYLES
import styles from './page.module.scss';

//ANTD
import { Layout } from 'antd';

//IMAGES
// import logo from 'assets/images/general/logo.svg';

//COMPONENTS
import SidebarMenu from '../SideBar';

const { Header, Content, Sider } = Layout;
type Props = {
  sideBarItems: Array<{ name: string; link: string }>;
  children: any;
};

const Page = ({ children, sideBarItems }: Props) => {
  return (
    <Layout style={{ minHeight: '100vh' }} className={styles['layout']}>
      <Header className={styles['header']}>
        <div className={styles['logo']}>
          <div className={styles['logo__image']}>{/* <img src={logo} alt="hm" /> */}</div>
        </div>
      </Header>
      <Layout>
        <Sider collapsed={false} className={styles['layout__sidebar']}>
          <SidebarMenu items={sideBarItems} />
        </Sider>
        <Layout>
          <Content className={styles['layout__content']}>{children} </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Page;
