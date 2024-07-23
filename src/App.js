import "./App.css";
import { AuthProvider } from "./components/Authentication/AuthContext";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </div>
  );
}

export default App;
