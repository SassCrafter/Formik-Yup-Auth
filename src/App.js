import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const { currentUser: user } = useAuth();
  // const user = null;
  console.log(user);
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: 450 }}>
        <Router>
          <Switch>
            <ProtectedRoute user={user} path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <IsUserRedirect
              exact
              user={user}
              loggedInPath="/dashboard"
              path="/"
            >
              <Signup />
            </IsUserRedirect>
            <IsUserRedirect
              exact
              user={user}
              loggedInPath="/dashboard"
              path="/login"
            >
              <Login />
            </IsUserRedirect>
            <Route />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default App;
