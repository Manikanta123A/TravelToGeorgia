import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Locate from './location/locate';
import First from './home/first';
import Second from './home/second';
import Show from './Timeline/show';
import Calu from './Caluculate';
import Food from './Timeline/food';

function App() {
  return (
    <main>
      <HashRouter>
        <Routes>
          <Route path="/map" element={<Locate />} />
          <Route path="/first" element={<First />} />
          <Route path="/second" element={<Second />} />
          <Route path="/show" element={<Show />} />
          <Route path="/cal" element={<Calu />} />
          <Route path="/food" element={<Food />} />
        </Routes>
      </HashRouter>
    </main>
  );
}

export default App;
