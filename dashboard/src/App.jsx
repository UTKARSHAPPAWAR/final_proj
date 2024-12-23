import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activity';
import Talks from './pages/Talks';
import Projects from './pages/Projects';
import Papers from './pages/Papers';
import Login from './pages/Login_new';
import Signup from './pages/Singup';
import UpdateForm from './utils/UpdateForm';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Routes>
        <Route exact path='/ckc/carbon-calculator-dashboard/outreach' element={<Activities isAuthenticated={isAuthenticated} />} />
        <Route exact path='/ckc/carbon-calculator-dashboard/update' element={<UpdateForm />} />
        <Route exact path='/ckc/carbon-calculator-dashboard/talks' element={<Talks isAuthenticated={isAuthenticated} />} />
        <Route exact path='/ckc/carbon-calculator-dashboard/projects' element={<Projects isAuthenticated={isAuthenticated} />} />
        <Route exact path='/ckc/carbon-calculator-dashboard/papers' element={<Papers isAuthenticated={isAuthenticated} />} />
        <Route exact path='/ckc/carbon-calculator-dashboard/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route exact path='/ckc/carbon-calculator-dashboard/signup' element={<Signup />} />
        <Route path="/ckc/carbon-calculator-dashboard" element={<Dashboard isAuthenticated={isAuthenticated} />} />
      </Routes>
    </>
  );
}

export default App;
