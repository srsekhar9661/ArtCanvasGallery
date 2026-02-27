import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div
        className="container"
        style={{ paddingTop: "100px", paddingBottom: "40px" }}
      >
        {children}
      </div>
    </>
  );
}

export default Layout;