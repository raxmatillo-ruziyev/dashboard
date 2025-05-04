import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './assets/Pages/Home/Home';
import Login from './assets/Pages/Login/Login';
import Users from './assets/Components/Users/Users';
import Dashboard from './assets/Components/Dashboard/Dashboard';
import { Stats } from './assets/Components/Stats';

function App(): JSX.Element {
  return (
    <Routes  >
     <Route path='/'>
     <Route index  element={<Login />} />
      <Route path="home" element={<Home />}>
       <Route index element={<Dashboard/>}/>
        <Route path="stats" element={<Stats />} />
        <Route path="users" element={<Users />} />
      </Route>
     </Route>
    </Routes>
  );
}

export default App;
