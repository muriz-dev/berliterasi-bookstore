import XSCard from "./components/xs-card";
import HeroBanner from "./components/hero-section";


export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* INI NAVBAR */}

          <HeroBanner />
          <XSCard />
        
      </div>
    </>
  );
}