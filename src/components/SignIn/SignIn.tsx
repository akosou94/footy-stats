import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/hooks.ts";

interface SignInCredentials {
  username: string;
  password: string;
}

const SignIn = () => {
  const store = useAuthStore();

  const { register, handleSubmit } = useForm<SignInCredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<SignInCredentials> = (data) => {
    store.signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true, maxLength: 20 })} />
      <input {...register("password", { required: true, maxLength: 20 })} />
      <input type="submit" />
    </form>
  );
};

export default SignIn;
