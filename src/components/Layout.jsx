import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
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