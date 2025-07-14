import { NavLink } from "react-router-dom";
import { FaUser, FaList, FaShoppingCart, FaStar } from "react-icons/fa";

const UserMenu = ({ classNames }) => (
  <>
    <li>
      <NavLink to="/dashboard/my-profile" className={classNames}>
        <FaUser size={18} />
        <span>My Profile</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/wishlist" className={classNames}>
        <FaList size={18} />
        <span>Wishlist</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/property-bought" className={classNames}>
        <FaShoppingCart size={18} />
        <span>Property Bought</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/my-reviews" className={classNames}>
        <FaStar size={18} />
        <span>My Reviews</span>
      </NavLink>
    </li>
  </>
);

export default UserMenu;