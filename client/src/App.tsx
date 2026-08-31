import NavFoot from "./layouts/nav-foot";
import Card_sm from "./components/card-sm";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* INI NAVBAR */}
        <NavFoot>
          <Card_sm />
        </NavFoot>
      </div>
    </>
  );
  );
}