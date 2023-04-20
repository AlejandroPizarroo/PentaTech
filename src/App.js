import './app.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './content/HomePage';
import LoginPage from './content/LoginPage';
import DashboardPage from './content/DashboardPage';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/dashboard" element={<DashboardPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
