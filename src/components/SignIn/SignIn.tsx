import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/hooks.ts";
import { observer } from "mobx-react-lite";
import { Button, Group, TextInput, Title } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./SignIn.module.scss";

interface SignInCredentials {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required("Обязательное поле"),
    password: yup
      .string()
      .required("Пароль обязателен")
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(20, "Пароль должен содержать не более 20 символов")
      .matches(/^\S*$/, "Пароль не должен содержать пробелов"),
  })
  .required();

const SignIn = observer(() => {
  const store = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<SignInCredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<SignInCredentials> = (data) => {
    store.signIn(data);
  };

  return (
    <section className={styles.SignIn}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.SignInForm}>
        <Title order={1} mb="md">
          Вход
        </Title>

        <TextInput
          {...register("username", { required: true, maxLength: 20 })}
          placeholder="Имя пользователя"
          error={errors.username?.message}
          mb="md"
          withAsterisk
          size="md"
          label="Имя"
        />

        <TextInput
          {...register("password", { required: true, maxLength: 20 })}
          placeholder="Пароль"
          type="password"
          error={errors.password?.message}
          mb="md"
          withAsterisk
          size="md"
          label="Пароль"
        />

        <Group justify="center" mt="md">
          <Button
            disabled={!isValid || !isDirty || isSubmitting}
            type="submit"
            color="deepRed.9"
            loading={store.isLoading}
          >
            Войти
          </Button>
        </Group>
      </form>
    </section>
  );
});

export default SignIn;
