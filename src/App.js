import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import users from './features/users'

const {components: { UsersPage }} = users;

function App() {
  return (
    <Router>
    <div>


      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
