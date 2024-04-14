import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loading from './pages/Loading';
import Login from './pages/Login';

const App = () => {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Loading />}/>
        <Route path="/login" element={<Login />}/>
        
        {/* ROTAS DO APLICATIVO */}
        <Route 
          path="/app/*" 
          element={
            <div className="flex">
              
            </div>
        } />

        {/* <Route path="/*" element={<PaginaErro />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
