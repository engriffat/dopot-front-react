import Page from "./views/Dashboard";
import Home from "./views/Home";
import InsProgetto from "./views/InsProgetto";
import PaginaCard from "./views/PaginaCard";
import MyNft from "./views/MyNft";
import MyProjects from "./views/MyProjects";
import Profile from "./views/Profile";
import Swap from "./views/Swap";
import LoadingPage from "./views/LoadingPage";
import DopotPower from "./views/DopotPower";
import DopotShare from "./views/DopotShare";
import XDao from "./views/XDao";
import Impostazioni from "./views/Impostazioni";

import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <HashRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Page />} />
        <Route path="insprogetto" element={<InsProgetto />} />
        <Route path="card/:address" element={<PaginaCard />} />
        <Route path="insprogetto" element={<PaginaCard />} />
        <Route path="mynft" element={<MyNft />} />
        <Route path="myprojects" element={<MyProjects />} />
        <Route path="profile" element={<Profile />} />
        <Route path="swap" element={<Swap />} />
        <Route path="dao" element={<XDao />} />
        <Route path="impostazioni" element={<Impostazioni />} />
        <Route path="loading" element={<LoadingPage />} />
        <Route path="dopotpower" element={<DopotPower />} />
        <Route path="dopotshare" element={<DopotShare />} />
      </Routes>
    </HashRouter>
  );

  return <Page />;
}

export default App;
