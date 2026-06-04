import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
