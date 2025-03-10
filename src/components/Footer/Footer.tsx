import { Box } from "@mantine/core";
import styles from "./Footer.module.scss";
import { FC } from "react";

interface FooterProps {
  privacy: string;
}

export const Footer: FC<FooterProps> = (props) => {
  const { privacy } = props;

  return (
    <Box
      component="footer"
      c="var(--mantine-color-bright)"
      bg="var(--mantine-color-dark-filled)"
      py={"xs"}
      px={"xs"}
      className={styles.Footer}
    >
      {privacy}
    </Box>
  );
};
