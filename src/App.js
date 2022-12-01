import './App.css';
import Navbar from './components/NavbarB';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Groups from './pages/Groups';
import GroupDetails from './pages/GroupDetails';
import EditGroup from './pages/EditGroup';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProfileDetails from './pages/ProfileDetails';
import EditProfile from './pages/EditProfile'
import Goals from "./pages/Goals"
import GoalDetails from "./pages/GoalDetails"
import AddGoal from "./components/AddGoal"
import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<ProfileDetails />}/>
        <Route path="/profile/:id" element={<EditProfile />}/>
        <Route path="/groups" element={<Groups />}/>
        <Route path="/groups/:id" element={<GroupDetails />} />
        <Route path="/groups/edit/:id" element={<EditGroup />} />
        <Route path="/goals" element={<Goals />}/>
        <Route path="/goals/:id" element={<AddGoal />} />
        <Route path="/goals/edit/:id" element={<EditGroup />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
