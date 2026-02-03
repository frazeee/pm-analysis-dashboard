import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChatbotPage() {
  const { projectId, reportType } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([{ text: "How can I help you with this report?", from: "bot" }]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/projects/${projectId}/reports/${reportType}`);
        setReportData(response.data.report_data);
      } catch (err) {
        setError(true);
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [projectId, reportType]);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

const handleSendMessage = async () => {
  if (!userMessage.trim()) return;

  // Add user message to messages
  setMessages(prevMessages => [...prevMessages, { text: userMessage, from: "user" }]);
  setLoadingResponse(true);

  // Prepare request body
  const requestBody = {
    question: userMessage,
    report_type: "validation", 
    max_chunks: 10 
  };

  console.log(requestBody); // Log the request body

  try {
    const response = await axios.post(`http://localhost:8000/api/v1/projects/${projectId}/ask-report?report_type=validation`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // Add bot response to messages
    setMessages(prevMessages => [...prevMessages, { text: response.data.answer, from: "bot" }]);
  } catch (error) {
    console.error("Error fetching response:", error.response ? error.response.data : error.message); // Log the error response
    setMessages(prevMessages => [...prevMessages, { text: "Error fetching response. Please try again.", from: "bot" }]);
  } finally {
    setLoadingResponse(false);
    setUserMessage(''); 
  }
};
  return (
    <div className="d-flex">
      <section className="w-100 bg-dark" style={{ minHeight: '100vh' }}>
        <div className="container-fluid p-5">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-outline-primary me-3" onClick={() => navigate(-1)}>
                  Back
                </button>
                {isChatbotVisible ? <h2 className='text-white fw-bold'>Chatting with Validation Report</h2> : ''}
                <button className="btn btn-outline-primary" onClick={toggleChatbot}>
                  {isChatbotVisible ? 'Back to Report' : 'Chat with Report →'}
                </button>
              </div>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                  <h1 className="text-white">Loading...</h1>
                </div>
              ) : isChatbotVisible ? (
                <div className="col-md-12">
                  <div className="pt-3 pe-3" style={{ position: "relative", height: "68vh", overflowY: "auto" }}>
                    {messages.map((message, index) => (
                      <div key={index} className={`d-flex flex-row ${message.from === "user" ? "justify-content-end" : "justify-content-start"}`}>
                        <div>
                          <p className={`p-3 ${message.from === "user" ? "me-3 mb-2 text-white rounded-3 bg-primary" : "ms-3 mb-4 rounded-3 bg-body-tertiary"}`} style={{maxWidth: "650px"}}>
                            {message.text}
                          </p>
                        </div>
                      </div>
                    ))}
                    {loadingResponse && (
                      <div className="d-flex flex-row justify-content-start">
                        <div>
                          <p className="p-3 ms-3 mb-4 rounded-3 bg-body-tertiary">
                            Loading response...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Type message"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="btn btn-primary ms-2" onClick={handleSendMessage}>Send</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-white mb-3">Validation Report</h3>
                  <div className="bg-body-tertiary p-3 rounded-3">
                    <div className="bg-body-tertiary p-3 rounded-3">
                      <h4 className='fw-bold'>Executive Summary</h4>
                      <p>{reportData.summary.executive_summary}</p>
                      <p><strong>Data Completeness Score:</strong> {reportData.data_completeness_score}</p>
                      <p><strong>Total Issues:</strong> {reportData.summary.total_issues}</p>
                      <p><strong>Data Quality:</strong> {reportData.summary.data_quality}</p>
                      <hr className='m-3' />
                      <h4 className='fw-bold'>Critical Issues</h4>
                      <ul>
                        {reportData.critical_issues.map((issue, index) => (
                          <li key={index}>
                            <strong>Issue ID:</strong> {issue.issue_id} - {issue.description}
                          </li>
                        ))}
                      </ul>
                      <h4>Warnings</h4>
                      <ul>
                        {reportData.critical_issues.map((issue, index) => (
                          <li key={index}>
                            <strong>Issue ID: {issue.issue_id}</strong> - {issue.description}
                            <ul>
                              <li>{`Affected Tasks: ${issue.affected_tasks}`}</li>
                              <li>{`Criticality: ${issue.criticality}`}</li>
                              <li>{`Reason: ${issue.reason}`}</li>
                              <li>{`Recommended Fix: ${issue.recommended_fix}`}</li>
                            </ul>
                          </li>
                        ))}
                      </ul>
                      <hr className='m-3' />
                      <h4>Recommendations</h4>
                      <ul>
                        {reportData.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatbotPage;
