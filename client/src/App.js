import './App.css';
import {Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Navbar from './pages/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import InstructorRoute from './components/PrivateRoute/InstructorRoute';
import AdminRoute from './components/PrivateRoute/AdminRoute';
import Room from './components/Room/Room';
import Main from './components/Main/Main';
import Users from './pages/Users';
import Courses from './pages/Courses'
import Courses_Student from './pages/Courses_Student'
import Index from './pages/Index';

function App() {
  return (
    <div>
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/Login' component={Login}/>
      <Route exact path='/Users' component={Users}/>
     {/*  <Route exact path='/Register' component={Register}/> */}
      <Route exact path='/Register/:role' component={Register}/>
      <Route exact path="/Room/:roomId" component={Room} />
      <Route exact path="/Main" component={Main} />
      <AdminRoute exact path="/Allusers" component={Users}/>
      <Route exact path='/Courses' component={Courses}/>
      <Route exact path='/Courses_Student' component={Courses_Student}/>
      <Route exact path='/Profile' component={Profile}/>
      
      

      </Switch>


      
    </div>
  );
}

export default App;
