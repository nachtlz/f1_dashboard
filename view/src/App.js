import logo from './f1_logo.svg';
import './App.css';

//importamos los componentes
import AddImage from './components/AddImage';
import NavBar from './components/NavBar';
import Drivers from './components/Drivers';
import Races from './components/Races';

//importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrincipalChart from './components/PrincipalChart';
import RaceResults from './components/RaceResults';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<PrincipalChart/>} />
            <Route path='/create' element={ <AddImage />} />
            <Route path='/drivers' element={ <Drivers />} />
            <Route path='/races' element={ <Races />} />
            <Route path='/raceResult/:idCircuit' element={<RaceResults />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
