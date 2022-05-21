import { Button, ButtonProps } from 'antd';
import { ButtonType } from 'antd/lib/button';
import styles from './simpleButton.module.scss';

const antdTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'];

type ButtonTypeOmit = Omit<ButtonProps, 'type'>;
export interface SimpleButtonProps extends ButtonTypeOmit {
  type: ButtonType | 'info' | 'secondary' | 'success' | 'warning' | 'danger' | 'dark' | 'light';
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ title, type, ghost, danger, className, ...props }) => {
  const dangerType = danger || type === 'danger';
  if (antdTypes.includes(type) || dangerType) {
    return (
      <Button type={type as ButtonType} ghost={ghost} danger={danger} className={className} {...props}>
        {title}
      </Button>
    );
  } else {
    return (
      <Button
        className={`${className} ${styles[`button--${type}`]} ${styles[`button--${type}${ghost ? '--ghost' : null}`]}`}
        {...props}
      >
        {title}
      </Button>
    );
  }
};

export default SimpleButton;
