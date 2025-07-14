import { NavLink } from "react-router-dom";
import { FaUserShield, FaList, FaUser, FaStar, FaAd } from "react-icons/fa";

const AdminMenu = ({ classNames, onItemClick }) => (
  <>
    <li>
      <NavLink to="/dashboard/admin-profile" className={classNames} onClick={onItemClick}>
        <FaUserShield size={18} />
        <span>Admin Profile</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/manage-properties" className={classNames} onClick={onItemClick}>
        <FaList size={18} />
        <span>Manage Properties</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/manage-users" className={classNames} onClick={onItemClick}>
        <FaUser size={18} />
        <span>Manage Users</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/manage-reviews" className={classNames} onClick={onItemClick}>
        <FaStar size={18} />
        <span>Manage Reviews</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/reported-property" className={classNames} onClick={onItemClick}>
        <FaAd size={18} />
        <span>Reported Property</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/advertise-property" className={classNames} onClick={onItemClick}>
        <FaAd size={18} />
        <span>Advertise Property</span>
      </NavLink>
    </li>
  </>
);

export default AdminMenu;