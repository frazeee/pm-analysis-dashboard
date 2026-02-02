import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
function ChatbotPage() {
  const { projectId, reportType } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [reportData, setReportData] = useState([]); // State to hold report data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(false); // State to track error

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/projects/${projectId}/reports/${reportType}`);
        setReportData(response.data.report_data);
        console.log(response.data.report_data); // Log the fetched data directly
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [projectId, reportType]);

  useEffect(() => {
    console.log(reportData); // Log the updated reportData whenever it changes
  }, [reportData]);

  return (
    <div className="d-flex">
      <section className="w-100 bg-dark" style={{ minHeight: '100vh' }}>
        <div className="container-fluid p-5">
          <div className="row">

            <div className="col-md-12">
              <div className="d-flex align-items-start mb-3">
                <button className="btn btn-outline-primary me-3" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
              <h3 className="text-white mb-0">Validation Report </h3>
              <div className="bg-body-tertiary p-3 rounded-3">
                <div>
                  <div className="bg-body-tertiary p-3 rounded-3">
                    <h4>Executive Summary</h4>
                    <p>{reportData.summary.executive_summary}</p>
                    <p><strong>Data Completeness Score:</strong> {reportData.data_completeness_score}</p>
                    <p><strong>Total Issues:</strong> {reportData.summary.total_issues}</p>
                    <p><strong>Data Quality:</strong> {reportData.summary.data_quality}</p>

                    <h4>Critical Issues</h4>
                    <ul>
                      {reportData.critical_issues.map((issue, index) => (
                        <li key={index}>
                          <strong>Issue ID:</strong> {issue.issue_id} - {issue.description}
                        </li>
                      ))}
                    </ul>

                    <h4>Warnings</h4>
                    <ul>
                      {reportData.formatted_report.split('## Section: (')[2].split('## Section: (')[0].trim().split('\n\n').map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>

                    <h4>Recommendations</h4>
                    <ul>
                      {reportData.recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Chatbot Section
            <div className="col-md-6">
              <div className="pt-3 pe-3" style={{ position: "relative", height: "68vh", overflowY: "auto" }}>
          
                <div className="d-flex flex-row justify-content-start">
                  <div>
                    <p className="p-3 ms-3 mb-4 rounded-3 bg-body-tertiary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua.
                    </p>
                  </div>
                </div>

          
                <div className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="p-3 me-3 mb-2 text-white rounded-3 bg-primary">
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>

              
                <div className="d-flex flex-row justify-content-start">
                  <div>
                    <p className="p-3 ms-3 mb-4 rounded-3 bg-body-tertiary">
                      Scroll test: Additional message to trigger the overflow-y.
                    </p>
                  </div>
                </div>
              </div>

             
              <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Type message"
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatbotPage;
