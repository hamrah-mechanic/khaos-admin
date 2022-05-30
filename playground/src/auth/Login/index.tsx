import { LoginForm } from 'hm-core';
import hmLogo from 'src/assets/hm-logo/new-logo.svg';
import styles from './login.module.scss';

const Login: React.FC = () => {
  return (
    <div className="hm-container">
      <div className="pt-6 pb-4 d-flex justify-content-center">
        <img src={hmLogo} />
      </div>
      <LoginForm callback={() => console.log('l')} cardClassName={styles['login__card']} />
    </div>
  );
};

export default Login;
