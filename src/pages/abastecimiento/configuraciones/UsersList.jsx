import { useState } from "react";
import UserTitle from "./UserTitle";
import UsersTable from "./UsersTable";
import useUsers from "../../../hooks/useUsers";

const initialState = {
  page: 1,
  per_page: 10,
};

const UsersList = ({ user }) => {
  const [body, setBody] = useState(initialState);
  const [reload, setReload] = useState(false);

  const resetState = () => {
    setReload(!reload);
  };

  const { data: registros, loading } = useUsers(
    user.token,
    Number(body.page),
    body.per_page,
    reload
  );

  if (loading)
    return (
      <div>
        <UserTitle etapa={"Confirmar entrega de solicitudes"} />
        <div className="flex justify-center items-center">
          <h3>Cargando... </h3>
        </div>
      </div>
    );

  return (
    <div>
      <UserTitle />
      <div className="flex mt-2 w-full flex-col">
        <UsersTable
          data={registros}
          resetState={resetState}
          filter={body}
          setFilter={setBody}
        />
      </div>
    </div>
  );
};

export default UsersList;
