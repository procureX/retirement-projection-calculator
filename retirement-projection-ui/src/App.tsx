import { Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import UserDetail from "./pages/UserDetail";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import UserProjections from "./pages/UserProjections";
import CreateProjection from "./pages/CreateProjection";
import EditProjection from "./pages/EditProjection";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<UserDashboard />}/>

      {/* User Detail */}
      <Route path="/users/:id" element={<UserDetail />}/>
        
      {/* Create User */}
      <Route path="/users/new" element={<CreateUser />}/>

      {/* Update User */}
      <Route path="/users/:id/edit" element={<UpdateUser />}/>

      {/* View Projections */}
      <Route path="/users/:id/projections" element={<UserProjections />}/>

      {/* Create New Projection */}
      <Route path="/users/:id/projections/new" element={<CreateProjection />}/>

      {/* Edit Projection */}
      <Route path="/users/:id/projections/:projId/edit" element={<EditProjection />}/>
    </Routes>
  );
}

export default App;