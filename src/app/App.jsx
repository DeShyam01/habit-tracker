import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../shared/components/NavBar";
import "./App.css";
import Home from "../features/home/pages/Home";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Insights from "../features/insights/pages/Insights";
import About from "../features/about/pages/About";
import NotFound from "../features/notfound/pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
