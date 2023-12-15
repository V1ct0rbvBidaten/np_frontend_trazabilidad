import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import AbastecimientoSideNav from "../navs/SideNavAdmin";

const AdminRoute = ({ Component }) => {
  const user = useSelector((state) => state.user);

  return user && user.token && user.role === "admin" ? (
    <>
      <div className="flex min-h-screen">
        <AbastecimientoSideNav user={user} />

        <main className="p-7 w-full bg-stone-50">
          <Component user={user} />
        </main>
      </div>
    </>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
