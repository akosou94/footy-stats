import { Outlet } from "react-router";
import { Header } from "../Header";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.Main}>{<Outlet />}</main>
      {/* <Footer privacy="Все права защищены © 2025" /> */}
    </>
  );
};

export default Layout;
