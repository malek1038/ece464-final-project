import Login  from './components/Login';
import Profile from './components/Profile';
import MainMenu from './components/mainMenu';
import EventPage from './components/eventPage';
import CreateEventPage from './components/createEventPage';
import Register from './components/Register';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireToken } from './components/Auth';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/main-menu" element={<RequireToken><MainMenu/></RequireToken>}/>
          <Route path="/profile" element={<RequireToken><Profile/></RequireToken>}/>
          <Route path="/event/:eventId" element={<RequireToken><EventPage/></RequireToken>} />
          <Route path="/create-event" element={<RequireToken><CreateEventPage/></RequireToken>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
