import { Button, ButtonProps } from 'antd';

interface SimpleButtonProps extends ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ children, onClick, title, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {title}
    </Button>
  );
};

export default SimpleButton;
