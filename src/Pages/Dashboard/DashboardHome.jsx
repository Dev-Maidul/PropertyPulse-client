import Spinner from "../../Shared/Spinner";
import useRole from "../../Hooks/useRole";
import UserHome from "./User/UserHome";
import AgentHome from "./Agent/AgentHome";
import AdminHome from "./Admin/AdminHome";

const DashboardHome = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Spinner />;

  if (role === "admin") return <AdminHome />;
  if (role === "agent") return <AgentHome />;
  return <UserHome />;
};

export default DashboardHome;