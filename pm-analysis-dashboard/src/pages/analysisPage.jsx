import Sidebar from "../components/sidebar";
import AnalysisDashboard from "../components/analysisDashboard";

function AnalysisPage() {
  return (
    <div className="d-flex">
      <Sidebar />
      <AnalysisDashboard />
    </div>
  );
}

export default AnalysisPage;
