export default function AnalysisDashboard() {
  return (
    <div className="bg-dark w-100">
      <div className="container py-5">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="text-white fw-semibold">Analysis</h1>
          <button
            className="btn btn-primary btn-md fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create Analysis
          </button>
        </div>
        <div className="row row-cols-3 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 border-secondary border-opacity-50">
              <img
                src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title fs-4">Validation Report</h5>
                <p className="card-text">
                  This is where we put the analysis description, project,
                  details, and anything relevant to the project itself.
                </p>
                <div className="d-flex justify-content-between">
                  {" "}
                  <button className="btn btn-outline-primary fw-semibold">
                    View Analysis
                  </button>
                  <button className="btn btn-outline-primary fw-semibold">
                    Chat with Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Choose a report to upload
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span className="fw-semibold">Report Type</span>
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
