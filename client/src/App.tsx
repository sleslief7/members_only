import { Outlet } from 'react-router-dom';
import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div id="app">
      <Header />
      <div id="outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
