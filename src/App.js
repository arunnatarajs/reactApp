import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css';
import GetCommits from './Get/GetCommits'
import GetDiff from './Get/GetDiff'
function App() {
  return (
    <div className="App">
      <Router>
        <div className='p'>
          <Switch>

            <Route exact path="/repo/:owner/:repository/commits/:oid">
              <GetCommits/>
            </Route>

            <Route exact path="/repo/:owner/:repository/commits/:oid/diff">
              <GetDiff/>
            </Route>
            
          </Switch>
        </div>
      </Router> 
    </div>
  );
}

export default App;
