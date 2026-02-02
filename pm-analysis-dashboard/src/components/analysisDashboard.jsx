import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


export default function AnalysisDashboard() {
  const { projectId } = useParams(); // Get the projectId from the URL
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [uploading, setUploading] = useState(false); // State to track upload status
  const [success, setSuccess] = useState(false); // State to track success
  const [error, setError] = useState(false); // State to track error
  const [files, setFiles] = useState({
    project_plan: null,
    pto_calendar: null,
    resource_allocation: null,
    raid_log: null,
  });

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/projects/${projectId}/reports`);
        setReports(response.data.reports || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, [projectId]);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0], // Store the first file
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData();
    for (const [key, value] of Object.entries(files)) {
      if (!value) {
        setError(true);
        setUploading(false);
        return; // Exit if any file is missing
      }
      formData.append(key, value);
    }

    try {
      await axios.post(`http://localhost:8000/api/v1/projects/${projectId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      // Close the modal by resetting the file inputs
      setFiles({
        project_plan: null,
        pto_calendar: null,
        resource_allocation: null,
        raid_log: null,
      });
      // Optionally, you can also hide the modal by setting a state variable
    } catch (error) {
      console.error('Error uploading files:', error);
      setError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-dark w-100">
      <div className="container py-5">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="text-white fw-semibold">Reports</h1>
          <button
            className="btn btn-primary btn-md fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create Report
          </button>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <h1 className="text-white">Loading...</h1>
          </div>
        ) : (
          <>
            {reports.length === 0 ? (
              <h1 className="text-white">No Reports Generated</h1>
            ) : (
              <div className="row row-cols-3 row-cols-md-3 g-4">
                {reports.map((report, index) => (
                  <div className="col" key={index}>
                    <div className="card h-100 border-secondary border-opacity-50">
                      <img
                        src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="card-img-top"
                        alt={report.report_type} // Use report type for alt text
                      />
                      <div className="card-body">
                        <h5 className="card-title fs-4">{capitalizeFirstLetter(report.report_type)} Report</h5> {/* Title with capitalized report type */}
                        <p className="card-text">Generated at: {new Date(report.generated_at).toLocaleString()}</p> {/* Date only */}
                        <div className="d-flex justify-content-evenly">
                          <Link to={`/chat/${projectId}/${report.report_type}`} className="btn btn-outline-primary fw-semibold">
                            View Report
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for uploading files */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Upload Required Documents
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Project Plan *</label>
                  <input type="file" className="form-control" name="project_plan" onChange={handleFileChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">PTO Calendar *</label>
                  <input type="file" className="form-control" name="pto_calendar" onChange={handleFileChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Resource Allocation *</label>
                  <input type="file" className="form-control" name="resource_allocation" onChange={handleFileChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">RAID Log *</label>
                  <input type="file" className="form-control" name="raid_log" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div className={`modal fade ${success ? 'show' : ''}`} style={{ display: success ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="successModalLabel" aria-hidden={!success}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="successModalLabel">Success</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Files uploaded successfully!
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => {
                setSuccess(false);
                window.location.reload(); // Refresh the page after success
              }}>OK</button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <div className={`modal fade ${error ? 'show' : ''}`} style={{ display: error ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="errorModalLabel" aria-hidden={!error}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="errorModalLabel">Error</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              There was an error uploading the files. Please try again.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => setError(false)}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
