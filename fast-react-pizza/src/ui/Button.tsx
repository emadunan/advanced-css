import { Link } from 'react-router-dom';

const Button = ({ children, disabled = false, to = null, type = 'base' }) => {
  const base =
    'm-2 inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';

  const styles = {
    base,
    primary: base + ' px-4 py-3 md:px-6 md:py-4 text-sm',
    small: base + ' px-2 py-1 md:px-4 md:py-2 text-xs',
    secondary:
      'text-sm m-2 inline-block rounded-full border border-stone-300 px-4 py-2.5 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
