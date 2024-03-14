import './App.css';
import Home from './screens/Home'
import Services from './screens/Services';
import HowWeWork from './screens/HowWeWork';
import Benefits from './screens/Benefits';
import Contact from './screens/Contact';
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Home/>
      <Services/>
      <HowWeWork/>
      <Benefits/>
      <Contact/>
    </div>
  );
}

export default App;
