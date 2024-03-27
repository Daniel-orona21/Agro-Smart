import { useForm } from 'react-hook-form';
import { addUser } from '../servicios/authService'
import swal from 'sweetalert';
function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res=await addUser(data);
    console.log(res)
    registroExitoso()
}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("username",{ required: true })} />
      
      <input type="text"  {...register("email",{ required: true })} />
      
      <input type="text"  {...register("password",{ required: true })} />


      <input type="submit" />
    </form>
  );
}

const registroExitoso = () => {
  swal({
    title: "¡Registro Exitoso!",
    text: "Ahora puedes ingresar con tu nueva cuenta",
    icon: "success",
    buttons: false,
    timer: 2000
  });
};
export default RegisterPage;