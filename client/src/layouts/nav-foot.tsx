import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeadFooter from "../components/headfooter";

const NavFoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* INI NAVBAR */}
        <Navbar />

        <main className="flex-grow p-4">
          {children}
        </main>

        {/* INI FOOTERNYA */}
        
          <HeadFooter />
          <Footer />

      </div>
    </>
  );
}
export default NavFoot;