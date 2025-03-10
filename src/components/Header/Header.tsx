import { Box, Group, Button, Text } from "@mantine/core";
import styles from "./Header.module.scss";
import { useAuthStore } from "../../store/hooks";
import { observer } from "mobx-react-lite";

export const Header = observer(() => {
  const store = useAuthStore();

  return (
    <Box
      component="header"
      c="var(--mantine-color-bright)"
      bg="deepRed.9"
      py={"xs"}
      px={"xs"}
      mt={"md"}
      mx={"sm"}
      className={styles.Header}
    >
      <Group align="center" justify="space-between">
        <Text size="xl">Footy-stats</Text>
        <Group>
          <Text size="md">Привет, {store.user?.username}</Text>
          <Button
            color="var(--mantine-color-bright)"
            bg="var(--mantine-color-dark-filled)"
          >
            Выйти
          </Button>
        </Group>
      </Group>
    </Box>
  );
});
