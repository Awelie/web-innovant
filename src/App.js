import './App.css';
import { Fitness } from './page/fitness'
import { About } from './page/about'
import { Navbar } from './components/navbar'
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Fitness />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
