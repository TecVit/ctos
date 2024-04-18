import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loading from './pages/Loading';
import Login from './pages/Login';
import Erro404 from './pages/Erro404';
import Software from "./pages/Software";

const App = () => {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Loading />}/>
        <Route path="/login" element={<Login />}/>
        
        {/* ROTAS DO APLICATIVO */}
        <Route 
          path="/software/*" 
          element={
            <div className="flex">
              <Routes>
                <Route path="/" element={<Software />}/>
                <Route path="/home" element={<Software />}/>
              </Routes>
            </div>
        } />

        <Route path="/*" element={<Erro404 />} />

      </Routes>
    </Router>
  );
}

export default App;
