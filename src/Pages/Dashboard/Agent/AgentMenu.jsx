import { NavLink } from "react-router-dom";
import { FaUser, FaPlus, FaList, FaShoppingCart } from "react-icons/fa";

const AgentMenu = ({ classNames }) => (
  <>
    <li>
      <NavLink to="/dashboard/agent-profile" className={classNames}>
        <FaUser size={18} />
        <span>Agent Profile</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/add-property" className={classNames}>
        <FaPlus size={18} />
        <span>Add Property</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/my-added-properties" className={classNames}>
        <FaList size={18} />
        <span>My Added Properties</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/my-sold-properties" className={classNames}>
        <FaShoppingCart size={18} />
        <span>My Sold Properties</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/requested-properties" className={classNames}>
        <FaList size={18} />
        <span>Requested Properties</span>
      </NavLink>
    </li>
  </>
);

export default AgentMenu;