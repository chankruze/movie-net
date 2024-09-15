import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <div style={{ height: 60 }}>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
