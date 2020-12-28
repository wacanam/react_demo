import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import api from "../api";

function EditElectionModal({ show, election, callBack }) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [start_date, setStart_date] = useState();
  const [end_date, setEnd_date] = useState();

  useEffect(()=> {
    setTitle(election && election.title);
    setDescription(election && election.description);
    setStart_date(election && election.start_date);
    setEnd_date(election && election.end_date);
  },[election && election.id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      api
        .put(`admin/election/update/${election.id}`, {
          title,
          description,
          start_date,
          end_date,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("Updated");
            show.setShowEditElectionModal(false);
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
        show={show.showEditElectionModal}
        size="md"
        onHide={() => show.setShowEditElectionModal(false)}
        backdrop="static"
        keyboard={true}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Election {election && election.id } Form |{" "}
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
                    defaultValue={title}
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
                    defaultValue={description}
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
                      defaultValue={start_date}
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
                      defaultValue={end_date}
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
                onClick={() => show.setShowEditElectionModal(false)}
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
export default React.memo(EditElectionModal);
