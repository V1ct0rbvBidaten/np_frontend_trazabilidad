import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { Button, User } from "@nextui-org/react";
import {
  ChartPieIcon,
  WrenchIcon,
  AdjustmentsHorizontalIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const AbastecimientoSideNav = ({ user }) => {
  let navigate = useNavigate();

  const ruta = useLocation().pathname;

  const activeMenuItem = [
    {
      name: "Resumen Solicitudes",
      route: "/abastecimiento/home",
      icon: <ChartPieIcon className="h-6 w-6 " />,
      type: "Menu",
    },

    {
      name: "Materiales",
      icon: <WrenchIcon className="h-6 w-6 " />,
      type: "SubMenu",
      route: "/abastecimiento/materiales",
      subMenuItems: [
        {
          name: "Gestionar",
          route: "/abastecimiento/materiales/gestionar",
          type: "Menu",
        },
        {
          name: "Aprobación",
          route: "/abastecimiento/materiales/aprobacion",
          type: "Menu",
        },
        {
          name: "Despachar",
          route: "/abastecimiento/materiales/despachar",
          type: "Menu",
        },
        {
          name: "Finalizar",
          route: "/abastecimiento/materiales/finalizar",
          type: "Menu",
        },
      ],
    },
    {
      name: "Servicios",
      icon: <UsersIcon className="h-6 w-6 " />,
      type: "SubMenu",
      route: "/abastecimiento/servicios",
      subMenuItems: [
        {
          name: "Aprobación",
          route: "/abastecimiento/servicios/aprobacion",
          type: "Menu",
        },
        {
          name: "Finalizar",
          route: "/abastecimiento/servicios/finalizar",
          type: "Menu",
        },
      ],
    },
  ];

  const activeMenuItemHerramientas = [
    {
      name: "Configuraciones",
      route: "/flota/configuraciones",
      icon: <AdjustmentsHorizontalIcon className="h-6 w-6 " />,
      type: "Menu",
    },
  ];

  const config = {
    icon: ({ active }) => {
      return {
        color: active ? "white" : "#f59e0b",
        transition: "all .3s ease",
      };
    },
    button: ({ level, active }) => {
      // only apply styles on first level elements of the tree
      if (level === 0)
        return {
          color: active ? "white" : undefined,
          backgroundColor: active ? "#f59e0b" : undefined,
          borderRadius: "40px",
          padding: "10px",
          height: "35px",
          margin: "5px",
          fontSize: "14px",
          transition: "all .3s ease",
          "&:hover": {
            backgroundColor: "#14b8a6",
            color: "white !important",
          },
        };
    },
  };

  const handleSignOut = async () => {
    //
  };

  const handleNavegar = (ruta) => {
    console.log("Navegar a");
    navigate(ruta);
  };

  return (
    <Sidebar
      className="bg-white p-4 overflow-y-hidden"
      backgroundColor="#fffff"
    >
      <div className="flex  justify-start items-center  mb-0 mr gap-3">
        <img src={Logo} height="20" width={80} />
        <h1 className=" font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
          Sistema Trazabilidad
        </h1>
      </div>
      <div className="mt-5 text-md text-slate-400">
        <p>Menu</p>
        <hr />
      </div>
      <Menu menuItemStyles={config}>
        {activeMenuItem &&
          activeMenuItem.map((c) => {
            if (c.type === "Menu") {
              if (ruta === c.route) {
                return (
                  <MenuItem
                    icon={c.icon}
                    active
                    key={c.name}
                    onClick={() => handleNavegar(c.route)}
                    // href={c.route}
                  >
                    {c.name}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem
                    icon={c.icon}
                    key={c.name}
                    onClick={() => handleNavegar(c.route)}
                  >
                    {c.name}
                  </MenuItem>
                );
              }
            } else if (c.type === "SubMenu") {
              if (ruta.includes(c.route)) {
                return (
                  <SubMenu key={c.name} icon={c.icon} label={c.name} active>
                    {c.subMenuItems.map((d) => (
                      <MenuItem
                        key={d.name}
                        onClick={() => handleNavegar(d.route)}
                        style={{
                          margin: "5px",
                          borderRadius: "15px",
                          height: "25px",
                          fontSize: "14px",
                        }}
                      >
                        {d.name}
                      </MenuItem>
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <SubMenu key={c.name} icon={c.icon} label={c.name}>
                    {c.subMenuItems.map((d) => (
                      <MenuItem
                        key={d.name}
                        onClick={() => handleNavegar(d.route)}
                        style={{
                          margin: "5px",
                          borderRadius: "15px",
                          height: "25px",
                          fontSize: "14px",
                        }}
                      >
                        {d.name}
                      </MenuItem>
                    ))}
                  </SubMenu>
                );
              }
            }
          })}
      </Menu>

      <div className="mt-3 text-md text-slate-400">
        <p>Herramientas</p>
        <hr />
      </div>
      <Menu menuItemStyles={config}>
        {activeMenuItemHerramientas &&
          activeMenuItemHerramientas.map((c) => {
            if (c.type === "Menu") {
              if (ruta === c.route) {
                return (
                  <MenuItem
                    icon={c.icon}
                    active
                    key={c.name}
                    // onClick={() => router.push(c.route)}
                  >
                    {c.name}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem
                    icon={c.icon}
                    key={c.name}
                    // onClick={() => router.push(c.route)}
                  >
                    {c.name}
                  </MenuItem>
                );
              }
            } else if (c.type === "SubMenu") {
              return (
                <SubMenu key={c.name} icon={c.icon} label={c.name}>
                  {c.subMenuItems.map((d) => (
                    <MenuItem
                      key={d.name}
                      // onClick={() => router.push(d.route)}
                    >
                      {d.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            }
          })}
      </Menu>

      <div className=" text-md text-slate-400">
        <p>Cuenta</p>
        <hr />
      </div>
      <div className="p-4 text-md">
        <User
          name={user.nombre_completo}
          description={
            <Link href="#" size="sm" className="text-amber-500">
              {user.role}
            </Link>
          }
          avatarProps={{
            src: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
          }}
        />
      </div>
      <Button
        onClick={handleSignOut}
        radius="full"
        className="w-full  bg-gradient-to-tr from-amber-300 to-amber-500  text-white shadow-lg"
      >
        Desconectarse{" "}
      </Button>
    </Sidebar>
  );
};

export default AbastecimientoSideNav;
