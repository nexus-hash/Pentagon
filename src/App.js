import {BrowserRouter,Route,Switch} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/welcome';
import signup from './pages/Authentication/signup';
import login from './pages/Authentication/login';
import ForgotPassword from './pages/Authentication/forgotpassword';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/login" component={login} />
        <Route exact path="/forgotpassword" component={ForgotPassword}/>
        <Route exact path="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
