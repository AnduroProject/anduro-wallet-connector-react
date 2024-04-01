import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './route/route';

function App() {
  return (
    <Router>
      <div className="widset_parent">
        {/* <MaraNetworksProvider> */}
          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={<route.component />} key={route.path} />
            ))}
          </Routes>
        {/* </MaraNetworksProvider> */}
      </div>
    </Router>
  );
}

export default App;