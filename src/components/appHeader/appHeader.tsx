import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchNotifications, selectAllNotifications } from "../../store/slices/notificationsSlice";
import "./appHeader.scss";

const AppHeader = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = <span className="badge">{numUnreadNotifications}</span>;
  }

  console.log("notes", numUnreadNotifications);

  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> info portal
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
          /
          <li className="app__menu_item">
            <NavLink
              className={({ isActive }) => (isActive ? "app__menu_link active" : "app__menu_link")}
              to="/users-posts"
            >
              Users of posts
            </NavLink>
          </li>
          /
          <li className="app__menu_item">
            <NavLink
              className={({ isActive }) => (isActive ? "app__menu_link active" : "app__menu_link")}
              to="/notifications"
            >
              Notifications {unreadNotificationsBadge}
            </NavLink>
          </li>
        </ul>
        <button className="button button__main" onClick={fetchNewNotifications}>
          <div className="inner">Refresh Notifications</div>
        </button>
      </nav>
    </header>
  );
};

export default AppHeader;
