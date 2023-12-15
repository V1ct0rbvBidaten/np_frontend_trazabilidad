import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

const MaterialesTitle = ({ etapa }) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex gap-3 p-4">
          <div className="flex flex-col">
            <p className="text-2xl">Solicitudes de Materiales</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-stone-400">{etapa}</p>
        </CardBody>
      </Card>

      <div className="flex mt-5 w-full flex-col"></div>
    </div>
  );
};

export default MaterialesTitle;
