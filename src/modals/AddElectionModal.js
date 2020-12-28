import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import api from "../api";

function AddElectionModal({ show, callBack }) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      api
        .post("admin/election/store", {
          title,
          description,
          start_date,
          end_date,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("Saved");
            show.setShowAddElectionModal(false);
            callBack.setNeedUpdate(callBack.needUpdate + 1);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Modal
        show={show.showAddElectionModal}
        size="md"
        onHide={() => show.setShowAddElectionModal(false)}
        backdrop="static"
        keyboard={true}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            New Election Form |{" "}
            <small>
              Press <code>ESC</code> to exit.
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <form onSubmit={handleSubmit.bind(this)}>
            <div>
              <p className="card-description">
                Input basic election parameters
              </p>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-primary border-primary"
                      id="input-title"
                    >
                      <i className="mdi mdi-pound text-white"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    required={true}
                    className="form-control"
                    placeholder="Title"
                    aria-label="title"
                    data-tip="This will serve as title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-primary border-primary"
                      id="input-type-selector"
                    >
                      <i className="mdi mdi-view-list text-white"></i>
                    </span>
                  </div>
                  <input
                    placeholder="Description (optional)"
                    className="form-control"
                    aria-label="description"
                    aria-describedby="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text bg-primary border-primary"
                        id="colored-addon3"
                      >
                        <i className="mdi mdi-play text-white"></i>
                      </span>
                    </div>
                    <input
                      type="datetime-local"
                      className="form-control"
                      aria-describedby="colored-addon3"
                      data-tip="Specify the Date and time for the announcement will start"
                      value={start_date}
                      onChange={(e) => setStart_date(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-6 form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text bg-primary border-primary"
                        id="colored-addon3"
                      >
                        <i className="mdi mdi-stop text-white"></i>
                      </span>
                    </div>
                    <input
                      type="datetime-local"
                      className="form-control"
                      aria-describedby="colored-addon3"
                      data-tip="Specify the Date and time for the announcement will end"
                      value={end_date}
                      onChange={(e) => setEnd_date(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="float-right">
              <button type="submit" className="btn btn-success mx-1">
                Create
              </button>
              <button
                className="btn btn-warning mx-1"
                onClick={() => show.setShowAddElectionModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </Modal.Body>
        <ReactTooltip />
      </Modal>
    </>
  );
}
export default React.memo(AddElectionModal);
