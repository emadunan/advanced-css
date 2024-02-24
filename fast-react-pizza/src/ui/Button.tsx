import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<Props> = ({
  children,
  disabled = false,
  to = null,
  type = 'base',
  onClick = undefined,
}) => {
  const base =
    'inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';

  const styles = {
    base,
    primary: base + ' px-4 py-3 md:px-6 md:py-4 text-sm',
    small: base + ' px-2 py-1 sm:px-4 sm:py-2 text-xs',
    rounded: base + ' px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm ',
    secondary:
      'text-sm inline-block rounded-full border border-stone-300 px-4 py-2.5 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
