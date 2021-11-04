import {BrowserRouter,Route,Switch} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/welcome';
import signup from './pages/Authentication/signup';
import login from './pages/Authentication/login';
import ForgotPassword from './pages/Authentication/forgotpassword';
import Dashboard from './pages/dashboard/dashboard';
import Logout from './pages/Authentication/logout';

function App() {
  window.localStorage.setItem('theme',true);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/login" component={login} />
        <Route exact path="/forgotpassword" component={ForgotPassword}/>
        <Route exact path={`/dashboard`} component={Dashboard} />
        <Route exact path={`/logout`} component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
