import NavFoot from "./layouts/nav-foot";
import Card_sm from "./components/card-sm";
import XSCard from "./components/xs-card";
import HeroBanner from "./components/hero-section";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* INI NAVBAR */}
        <NavFoot>
          <HeroBanner />
          <XSCard />
          <Card_sm />
        </NavFoot>
      </div>
    </>
  );
}