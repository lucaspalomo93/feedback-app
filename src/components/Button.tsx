import { ReactNode } from 'react';

interface ButtonInterface {
  children: ReactNode;
  version: string;
  type: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
}

const Button = ({
  children,
  version,
  type = 'submit',
  isDisabled = false,
}: ButtonInterface) => {
  return (
    <button className={`btn btn-${version}`} type={type} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
