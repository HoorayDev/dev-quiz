import { FC, ReactNode } from 'react';

// TODO : add props icon
interface DQButtonProps {
  children: ReactNode;
};

// TODO : refactor scss
const DQButton: FC<DQButtonProps> = ({
  children
}) => {
  return <button style={{
    backgroundColor: '#F8E115',
    border: 'none',
    borderRadius: '3px',
    width: '230px',
    height: '40px',
    color: 'black',
    textAlign: 'center',
    display: 'inline-block',
    fontSize: '16px',
  }}>▶︎ {children}</button>
};

export { DQButton };