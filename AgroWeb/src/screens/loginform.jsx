import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../servicios/authService";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/login.css";
import ops from "../componentes/sweet.js";

const LoginForm = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const onSubmitlogin = async (data) => {
    try {
      console.log(data);
      const res = await loginUser(data);
      console.log(res);
      if (res) {
        console.log("Usuario logeado");
        setUser(res.data);
        setIsAuthenticated(true);
        setUsername(data.usuario);
        navigate("/home-screen"); // Redirige al usuario a la pantalla home-screen
      }
    } catch (error) {
      ops();
    }
  };

  return (
    <div className="login">
      <form>
        <label htmlFor="chk" aria-hidden="true">
          Iniciar Sesión
        </label>
        <input
          type="text"
          name="email"
          placeholder="Correo electrónico"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
        <button
          type="button"
          className="button3"
          onClick={handleSubmit(onSubmitlogin)}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
