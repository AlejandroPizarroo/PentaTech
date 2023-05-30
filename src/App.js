import './app.scss';
import { useState } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './content/HomePage';
import LoginPage from './content/LoginPage';
import DashboardPage from './content/DashboardPage';
import DashboardTest from './content/DashboardTest';
import PrivateRoute from "./utils/PrivateRoute";
import ErrorPage from './content/ErrorPage';

function App() {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='login' element={<LoginPage user={user} setUser={setUser}></LoginPage>} />
                <Route
                    path='dashboard'
                    element={
                        <PrivateRoute user={user}>
                            <DashboardPage user={user} setUser={setUser}/>
                        </PrivateRoute>
                    }
                />
                <Route path='test' element={<DashboardTest/>}/>
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
