import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import MarketPlace from "./components/MarketPlace";

function App() {
  return (
    <div className="">
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main>
        <SideBar />
        <MarketPlace />
      </main>
    </div>
  );
}

export default App;
