import Sidebar from "../components/sidebar";
import Chatbot from "../components/chatbot";
function ChatbotPage() {
  return (
    <div className="d-flex">
      <Sidebar />
      <Chatbot />
    </div>
  );
}

export default ChatbotPage;
