import NavFoot from "../src/layouts/nav-foot";
import Card_sm from "../src/components/card-sm";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        
        <NavFoot>
          <Card_sm />
        </NavFoot>
      </div>
    </>
  );
}