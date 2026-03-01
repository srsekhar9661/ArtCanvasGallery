import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

function Layout({ children }) {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <div className="page-content">
      {children}
    </div>
  </>
  );
}

export default Layout;