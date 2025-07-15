// UserMenu.jsx
import { NavLink } from "react-router-dom";
import { FaUser, FaList, FaShoppingCart, FaStar } from "react-icons/fa";

const UserMenu = ({ classNames, onItemClick }) => (
  <>
    <li>
      <NavLink to="/dashboard/profile" className={classNames} onClick={onItemClick}>
        <FaUser size={18} />
        <span>My Profile</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/wishlist" className={classNames} onClick={onItemClick}>
        <FaList size={18} />
        <span>Wishlist</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/property-bought" className={classNames} onClick={onItemClick}>
        <FaShoppingCart size={18} />
        <span>Property Bought</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/my-reviews" className={classNames} onClick={onItemClick}>
        <FaStar size={18} />
        <span>My Reviews</span>
      </NavLink>
    </li>
  </>
);

export default UserMenu;