export default function Dashboard() {
  return (
    <div className="bg-dark w-100">
      <div className="container py-5">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="text-white fw-semibold">Projects</h1>
          <button className="btn btn-primary btn-md fw-semibold">Create Project</button>
        </div>
        <div class="row row-cols-3 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100 border-secondary border-opacity-50">
              <img
                src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title fs-4">Sample Project</h5>
                <p class="card-text">
                  This is where we put the project description. Project dates,
                  project duration, details, and anything relevant to the
                  project itself.
                </p>
                <button className="btn btn-outline-primary fw-semibold">
                  View Project
                </button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 border-secondary border-opacity-50">
              <img
                src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title fs-4">Sample Project</h5>
                <p class="card-text">
                  This is where we put the project description. Project dates,
                  project duration, details, and anything relevant to the
                  project itself.
                </p>
                <button className="btn btn-outline-primary fw-semibold">
                  View Project
                </button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100 border-secondary border-opacity-50">
              <img
                src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title fs-4">Sample Project</h5>
                <p class="card-text">
                  This is where we put the project description. Project dates,
                  project duration, details, and anything relevant to the
                  project itself.
                </p>
                <button className="btn btn-outline-primary fw-semibold">
                  View Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
