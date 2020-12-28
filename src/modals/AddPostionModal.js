import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import api from "../api";

function AddPositionModal({ show, callBack, election }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [election_id, setElection_id] = useState();
  const [elections, setElections] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      api
        .post("admin/position/store", {
          name,
          description,
          election_id: election
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("Saved");
            show.setShowAddPositionModal(false);
            callBack.setNeedUpdate(callBack.needUpdate + 1);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
//   useEffect(() => {
//     api
//       .get("admin/election")
//       .then((res) => {
//         console.log(res);
//         if (res.status === 200) {
//           setElections(res.data.data);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

  return (
    <>
      <Modal
        show={show.showAddPositionModal}
        size="lg"
        onHide={() => show.setShowAddPositionModal(false)}
        backdrop="static"
        keyboard={true}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add Position Form |{" "}
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
                      id="input-name"
                    >
                      <i className="mdi mdi-pound text-white"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    required={true}
                    className="form-control"
                    placeholder="Position"
                    aria-label="position"
                    data-tip="This will serve as position"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-primary border-primary"
                      id="input-description"
                    >
                      <i className="mdi mdi-pound text-white"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description (optional)"
                    aria-label="description"
                    data-tip="This will serve as description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="float-right">
              <button type="submit" className="btn btn-success mx-1">
                Create
              </button>
              <button
                className="btn btn-warning mx-1"
                onClick={() => show.setShowAddPositionModal(false)}
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
export default React.memo(AddPositionModal);
