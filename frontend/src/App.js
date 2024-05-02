import Login  from './components/Login';
import Profile from './components/Profile';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireToken } from './components/Auth';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route
            path="/profile"
            element={
              <RequireToken>
                <Profile/>
              </RequireToken>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
