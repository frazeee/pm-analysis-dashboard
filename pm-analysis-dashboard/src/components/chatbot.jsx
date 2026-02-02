export default function Chatbot() {
  return (
<section className="w-100 bg-dark" style={{ minHeight: '100vh' }}>
      <div className="container-fluid p-5">
        <div className="row">
          <div className="d-flex align-items-end w-100">
            <div className="text-white ms-auto">
              <h3 className="mb-0">Report</h3>
            </div>
          </div>
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="row">
              {/* Main Chat Window */}
              <div className="col-md-12 col-lg-12 col-xl-12">
                <div
                  className="pt-3 pe-3"
                  style={{
                    position: "relative",
                    height: "750px", // Required for overflowY to work
                    overflowY: "auto",
                  }}
                >
                  {/* Received Message */}
                  <div className="d-flex flex-row justify-content-start">
                    <div>
                      <p className="p-3 ms-3 mb-4 rounded-3 bg-body-tertiary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </div>
                  </div>

                  {/* Sent Message */}
                  <div className="d-flex flex-row justify-content-end">
                    <div>
                      <p className="p-3 me-3 mb-2 text-white rounded-3 bg-primary">
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>

                  {/* Dummy content to demonstrate scroll */}
                  <div className="d-flex flex-row justify-content-start">
                    <div>
                      <p className="p-3 ms-3 mb-4 rounded-3 bg-body-tertiary">
                        Scroll test: Additional message to trigger the overflow-y.
                      </p>
                    </div>
                  </div>
                  
                </div>

                {/* Footer / Input Area */}
                <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Type message"
                  />
                  <a className="ms-1 text-muted" href="#!">
                    <i className="fas fa-paperclip"></i>
                  </a>
                  <a className="ms-3 text-muted" href="#!">
                    <i className="fas fa-smile"></i>
                  </a>
                  <a className="ms-3 text-white" href="#!">
                    <i className="fas fa-paper-plane"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div className="bg-dark w-100">
    //   <div className="container-fluid py-5">
    //     <div className="d-flex justify-content-between mb-3">
    //       <div
    //         className="d-flex flex-row flex-wrap-reverse h-100 w-100 overflow-y-auto text-white"
    //         style={{ height: "100vh" }}
    //       ></div>
    //       <div className="col-6 d-flex flex-column h-100 overflow-y-auto p-3">
    //           <h1>Report Name</h1>
    //         </div>
    //     </div>
    //   </div>
    // </div>
  );
}
