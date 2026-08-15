import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeadFooter from "../components/headfooter";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* INI NAVBAR */}
        <Navbar />


    
        {/* INI FOOTERNYA */}
        <HeadFooter />
        <Footer />
      </div>
    </>
  );
}