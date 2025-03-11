import styles from "./SignUp.module.scss";
import { Button, Group, TextInput, Title } from "@mantine/core";
import { useAuthStore } from "../../store/hooks.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

interface SignUpCredentials {
  username: string;
  password: string;
}

const SignUp = observer(() => {
  const store = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<SignUpCredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit: SubmitHandler<SignUpCredentials> = (data) => {
    store.signUp(data);
  };

  return (
    <section className={styles.SignUp}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.SignUpForm}>
        <Title order={1} mb="md">
          Регистрация
        </Title>

        <TextInput
          {...register("username", { required: true, maxLength: 20 })}
          placeholder="Имя пользователя"
          error={errors.username?.message}
          mb="md"
          withAsterisk
          size="md"
        />

        <TextInput
          {...register("password", { required: true, maxLength: 20 })}
          placeholder="Пароль"
          type="password"
          error={errors.password?.message}
          mb="md"
          withAsterisk
          size="md"
        />

        <Group justify="center" mt="md">
          <Button
            disabled={!isValid || !isDirty || isSubmitting}
            type="submit"
            color="deepRed.9"
            loading={store.isLoading}
          >
            Отправить
          </Button>
        </Group>
      </form>
    </section>
  );
});

export default SignUp;
