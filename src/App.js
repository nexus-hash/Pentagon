import {BrowserRouter,Route,Switch} from 'react-router-dom';
import WelcomePage from './welcome';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
