import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import HeadFooter from "./components/headfooter.jsx";
import Card_sm from "./components/card-sm.jsx";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* INI NAVBAR */}
        <Navbar />

        {/* INI ISINYA */}
        <main className="grow">
          <h1>Home</h1>
          <Card_sm />
        </main>
    
        {/* INI FOOTERNYA */}
        <HeadFooter />
        <Footer />
      </div>
    </>
  );
}