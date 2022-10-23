import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import MarketPlace from "./components/MarketPlace";

function App() {
  return (
    <div className="">
      <header>
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
