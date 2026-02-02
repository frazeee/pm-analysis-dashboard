import "./App.css";
import SideBar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import AnalysisDashboard from "./components/analysisDashboard";


function App() {
  return (
    <div className="d-flex">
      <SideBar />
      <AnalysisDashboard/>
    </div>
  );
}

export default App;
