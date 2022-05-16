import { Button, ButtonProps } from 'antd';

export interface SimpleButtonProps extends ButtonProps {
  onClick?: () => void;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ onClick, title, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {title}
    </Button>
  );
};

export default SimpleButton;
