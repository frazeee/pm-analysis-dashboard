import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); 

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

  return (
    <div className="bg-dark w-100">
      <div className="container py-5">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="text-white fw-semibold">Projects</h1>
          <button className="btn btn-primary btn-md fw-semibold">Create Project</button>
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
    </div>
  );
};

export default Dashboard;
