import {BrowserRouter,Route,Switch} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/welcome';
import signup from './pages/Authentication/signup';
import login from './pages/Authentication/login';
import ForgotPassword from './pages/Authentication/forgotpassword';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  let name = 'React';
  window.localStorage.setItem('theme',true);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/login" component={login} />
        <Route exact path="/forgotpassword" component={ForgotPassword}/>
        <Route exact path={`/${name}`} component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
