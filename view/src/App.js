import './App.css';

//importamos los componentes
import AddImage from './components/AddImage';
import NavBar from './components/NavBar';
import Drivers from './components/Drivers';
import Races from './components/Races';
import DriverPoints from './components/DriverPoints';

//importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home />} />
            <Route path='/create' element={ <AddImage />} />
            <Route path='/drivers' element={ <Drivers />} />
            <Route path='/drivers/:idDriver' element={ <DriverPoints />} />
            <Route path='/races' element={ <Races />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
