import { Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserDetail from "./pages/UserDetail";
import CreateProjection from "./pages/CreateProjection";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/users/:id/projections/new" element={<CreateProjection />} />
      <Route path="/users/new" element={<CreateUser />} />
    </Routes>
  );
}

export default App;/*
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";
import UpdateUser from "./pages/UpdateUser";
import UserProjections from "./pages/UserProjections";
import CreateProjection from "./pages/CreateProjection";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard *///}
        //<Route path="/" element={<Dashboard />} />

        //{/* User Detail */}
        //<Route path="/users/:id" element={<UserDetail />} />

        //{/* Update User */}
        //<Route path="/users/:id/edit" element={<UpdateUser />} />

        //{/* View Projections */}
        //<Route path="/users/:id/projections" element={<UserProjections />} />

        //{/* Create New Projection */}
        //<Route path="/users/:id/projections/new" element={<CreateProjection />} />
      //</Routes>
    //</BrowserRouter>
  /*);
}
*/