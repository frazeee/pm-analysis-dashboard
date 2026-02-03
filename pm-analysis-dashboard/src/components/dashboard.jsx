import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Prepare the request body
    const requestBody = {
      project_name: projectName,
      description: description,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/projects', requestBody);
      console.log('Project created:', response.data);
      setProjectName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
    finally {
      window.location.reload();
    }
  };

  return (
    <div className="bg-dark w-100">
      <div className="container py-5">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="text-white fw-semibold">Projects</h1>
          <button className="btn btn-primary btn-md fw-semibold" data-bs-toggle="modal" data-bs-target="#createModal">Create Project</button>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <h1 className="text-white">Loading...</h1>
          </div>
        ) : (
          <>
            {projects.length === 0 ? (
              <h1 className="text-white">No Projects Available</h1>
            ) : (
              <div className="row row-cols-3 row-cols-md-3 g-4">
                {projects.map((project) => (
                  <div className="col" key={project.project_id}>
                    <div className="card h-100 border-secondary border-opacity-50">
                      <img
                        src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="card-img-top"
                        alt={project.project_name}
                      />
                      <div className="card-body">
                        <h5 className="card-title fs-4">{project.project_name}</h5>
                        <p className="card-text">{project.description}</p>
                        <Link to={`/analysis/${project.project_id}`} className="btn btn-outline-primary fw-semibold">
                          View Project
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="createModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Create Project</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form onSubmit={handleSubmit}> {/* Move the form tag here */}
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>



  );
};

export default Dashboard;
