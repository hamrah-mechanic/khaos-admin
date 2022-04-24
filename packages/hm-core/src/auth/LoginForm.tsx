import { Card, Input } from 'antd';
import { SimpleButton } from 'hm-components';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
const LoginForm = ({ onLogin, test }: any) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const submit = async () => {
    await onLogin(username, password);
  };
  const testAuth = () => {
    test();
  };
  return (
    <Card title="ورود به سیستم">
      <Input value={username} onChange={value => setUsername(value.target.value)} />
      <Input value={password} onChange={value => setpassword(value.target.value)} />
      <SimpleButton title="Login" onClick={submit} />
      <SimpleButton title="test" onClick={testAuth} />
    </Card>
  );
};

export default LoginForm;
