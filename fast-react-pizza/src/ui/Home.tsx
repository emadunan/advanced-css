import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);
  
  return (
    <div className="mx-4 my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold">
        The best pizza.
        <br />
        <span className="mt-4 inline-block text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? (
        <Button type="primary" to="/menu">
          Continue ordering {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
