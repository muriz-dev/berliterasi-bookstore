import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeadFooter from "../components/headfooter";

const NavFoot = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* INI NAVBAR */}
        <Navbar />

        

        {/* INI FOOTERNYA */}
        <div className="mt-auto">
        <HeadFooter />
        <Footer />
        </div>
      </div>
    </>
  );
}
export default NavFoot;