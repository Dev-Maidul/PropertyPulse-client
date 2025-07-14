import { NavLink } from "react-router-dom";
import { FaUser, FaPlus, FaList, FaShoppingCart } from "react-icons/fa";

const AgentMenu = ({ classNames, onItemClick }) => (
  <>
    <li>
      <NavLink to="/dashboard/profile" className={classNames} onClick={onItemClick}>
        <FaUser size={18} />
        <span>Agent Profile</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/add-property" className={classNames} onClick={onItemClick}>
        <FaPlus size={18} />
        <span>Add Property</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/my-added-properties" className={classNames} onClick={onItemClick}>
        <FaList size={18} />
        <span>My Added Properties</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/my-sold-properties" className={classNames} onClick={onItemClick}>
        <FaShoppingCart size={18} />
        <span>My Sold Properties</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/requested-properties" className={classNames} onClick={onItemClick}>
        <FaList size={18} />
        <span>Requested Properties</span>
      </NavLink>
    </li>
  </>
);

export default AgentMenu;