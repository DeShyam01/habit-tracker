import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>Habit Tracker</h1>
      <input type="checkbox" id="hamburger" />
      <label htmlFor="hamburger" className="hamburger">
        Menu
      </label>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">My Habits</NavLink></li>
        <li><NavLink to="/insights">Insights</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;
