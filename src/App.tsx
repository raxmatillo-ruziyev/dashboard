import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './assets/Pages/Home/Home';
import Login from './assets/Pages/Login/Login';
import Users from './assets/Components/Users/Users';
import Dashboard from './assets/Components/Dashboard/Dashboard';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />}>
        <Route path="stats" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
