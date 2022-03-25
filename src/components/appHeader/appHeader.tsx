import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul className="app__menu_list">
          <li className="app__menu_item">
            <NavLink
              end
              className={({ isActive }) => (isActive ? "app__menu_link active" : "app__menu_link")}
              to="/"
            >
              Characters
            </NavLink>
          </li>
          /
          <li className="app__menu_item">
            <NavLink
              className={({ isActive }) => (isActive ? "app__menu_link active" : "app__menu_link")}
              to="/comics"
            >
              Comics
            </NavLink>
          </li>
          /
          <li className="app__menu_item">
            <NavLink
              end
              className={({ isActive }) => (isActive ? "app__menu_link active" : "app__menu_link")}
              to="/users"
            >
              Users
            </NavLink>
          </li>
          /
          <li className="app__menu_item">
            <NavLink
              end
              className={({ isActive }) => (isActive ? "app__menu_link active" : "app__menu_link")}
              to="/form"
            >
              Form
            </NavLink>
          </li>
          /
          <li className="app__menu_item">
            <NavLink
              className={({ isActive }) => (isActive ? "app__menu_link active" : "app__menu_link")}
              to="/posts"
            >
              Posts List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
