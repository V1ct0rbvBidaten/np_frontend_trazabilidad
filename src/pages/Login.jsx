import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  bg-gray-100">
      <div className="flex  text-center ">
        <div className="bg-white rounded-2xl shadow-2xl   max-w-4xl ">
          <div className=" col-span-2 lg:col-span-1  w-full p-5 lg:w-full">
            <div className="text-left font-bold">
              <span className="text-amber-500"> Naviera </span> Paredes
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-amber-500  mb-2">
                Iniciar Sesión
              </h2>
              <div className="border-2 w-10 border-amber-500 inline-block mb-2"></div>
              <div className="flex flex-col items-center">
                <LoginForm />
                <a
                  href="https://bidaten.com/"
                  className="text-gray-300 text-sm mt-10"
                >
                  Desarrollado por @Bidaten Ltda
                </a>
              </div>
            </div>
          </div>
          {/* <div className='bg-amber-500  flex items-center justify-center  md:col-span-1 lg:block hidden text-white  rounded-tr-2xl rounded-br-2xl   ' style={styling}>
            
            <h2 className='text-3xl  font-bold mb-2'>¡Bienvenido!</h2>
            <div className='border-2 w-10 border-white inline-block mb-2'></div>
            <p className='mb-2'>Esta ingresando a sistema de gestión de pedimentos</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
