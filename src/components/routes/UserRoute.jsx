import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import SideNavUser from "../navs/SideNavUser";

const UserRoute = ({ Component }) => {
  const user = useSelector((state) => state.user);

  return user && user.token && user.role === "user" ? (
    <>
      <div className="flex min-h-screen">
        <SideNavUser user={user} />

        <main className="p-7 w-full bg-stone-50">
          <Component user={user} />
        </main>
      </div>
    </>
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
