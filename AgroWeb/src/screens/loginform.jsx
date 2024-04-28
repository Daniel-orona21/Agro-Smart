import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../servicios/authService";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../css/login.css";
import ops from "../componentes/sweet.js";
import { profile, verifyTokenRequest } from '../servicios/authService';
import { getFirstDataFromAllCharts } from '../servicios/compService';
import { createContext, useContext } from "react";
import Cookies from "js-cookie";

const LoginForm = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const onSubmitlogin =  (data) => {
    try {
      console.log(data);
      const res =  loginUser(data);
      console.log(res);
      if (res) {
        console.log("Usuario logeado");
        setUser(res.data);
        setIsAuthenticated(true);
        setUsername(data.usuario);

        const res =  verifyTokenRequest(Cookies.token);
        console.log(res);
        setIsAuthenticated(true);
        setUser(res.data);

        navigate("/home-screen"); // Redirige al usuario a la pantalla home-screen
        if (!res.data) return setIsAuthenticated(false);
        
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
