import React, { useContext, useEffect } from 'react';

//STYLES
import styles from './page.module.scss';

//ANTD
import { Layout, notification } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

//IMAGES
// import logo from 'assets/images/general/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setError } from '../../store/slices/errorSlice';

//COMPONENTS
import SidebarMenu from '../SideBar';
import GlobalContext from '../../store/GlobalContext';

const { Header, Content, Sider } = Layout;
type Props = {
  sideBarItems: Array<{ name: string; link: string }>;
  children: React.ReactNode;
};

const Page = ({ children, sideBarItems }: Props) => {
  const { logo } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error);
  useEffect(() => {
    if (error.message) {
      const key = `open${Date.now()}`;
      notification.error({
        message: error.title,
        description: error.message,
        placement: 'bottom',
        key,
        icon: error.icon ? error.icon : <InfoCircleOutlined />,
        onClose: onClose,
        style: {
          width: 600,
        },
      });
    }
  }, [error]);
  const onClose = () => {
    dispatch(
      setError({
        title: '',
        type: '',
        message: '',
      }),
    );
  };

  return (
    <Layout className={styles['layout']}>
      <Header className={styles['header']}>
        <div className={styles['logo']}>
          <div className={styles['logo__image']}>
            <img src={logo} alt="hm" />
          </div>
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
