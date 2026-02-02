import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectsPage from "./pages/projectPage";
import AnalysisPage from "./pages/analysisPage";
import ChatbotPage from "./pages/chatbotPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="chat" element={<ChatbotPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

