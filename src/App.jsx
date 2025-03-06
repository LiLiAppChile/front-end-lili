// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-bold">Bienvenido a la App</h1>
      <nav className="mt-4">
        <Link to="/registro" className="text-blue-500 underline">
          Ir a Registro
        </Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<h1>Bienvenido a la App</h1>} />
        <Route path="/registro" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
