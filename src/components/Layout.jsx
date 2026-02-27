import Navbar from "./Navbar";

function Layout({ children }){
    return (
        <>
        <Navbar />
        <div className="container" style={{padding:'40px 0'}}>
            {children}
        </div>
        </>
    )
}

export default Layout;
