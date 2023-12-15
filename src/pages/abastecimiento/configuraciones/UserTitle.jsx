import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

const UserTitle = ({ etapa }) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex gap-3 p-4">
          <div className="flex flex-col">
            <p className="text-2xl">Gestion de usuarios</p>
          </div>
        </CardHeader>
      </Card>

      <div className="flex mt-5 w-full flex-col"></div>
    </div>
  );
};

export default UserTitle;
