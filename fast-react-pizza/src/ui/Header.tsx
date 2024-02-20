import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

const Header = () => {
  return (
    <header className="xs:flex-row flex flex-col items-center justify-between border-b border-stone-200 bg-yellow-400 p-4 uppercase">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
