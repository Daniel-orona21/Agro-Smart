import { useForm } from 'react-hook-form';
import { register } from '../servicios/authService'

function RegisterPage() {
  const { handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res=await register(data);
    console.log(res)
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

export default RegisterPage;
