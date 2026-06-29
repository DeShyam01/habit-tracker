import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="not-found-page">
      <p className="eyebrow">404</p>
      <h2>This route skipped habit day.</h2>
      <p>The page you opened does not exist, but your streak can still survive.</p>
      <Link to="/dashboard">Back to My Habits</Link>
    </main>
  );
};

export default NotFound;
