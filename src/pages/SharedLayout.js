import { Outlet } from "react-router-dom";
import { Navbar, Footer, Sidebar } from "../components";

const SharedLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default SharedLayout;
