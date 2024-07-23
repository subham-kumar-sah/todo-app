import "./App.css";
import { AuthProvider } from "./components/Authentication/AuthContext";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      {/* AuthProvider Component containing user data which is passed to all the components using context */}
      <AuthProvider>
        {/* Layout helps us switch between Todo List App and LogIn form*/}
        <Layout />
      </AuthProvider>
    </div>
  );
}

export default App;
