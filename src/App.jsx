import { Routes, Route } from 'react-router-dom';
import { Film, Home } from './pages';
import Admin from './pages/Admin';
import { Header } from './components';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;