import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import api from "../api";

function AddCandidateModal({ show, callBack, position }) {
  const [voter_id, setVoter_id] = useState();

  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (voter_id) {
      api
        .post("admin/candidate/store", {
          voter_id,
          position_id: position,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("Saved");
            show.setShowAddCandidateModal(false);
            callBack.setNeedUpdate(callBack.needUpdate + 1);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    api
      .get("admin/user")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setUsers(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Modal
        show={show.showAddCandidateModal}
        size="lg"
        onHide={() => show.setShowAddCandidateModal(false)}
        backdrop="static"
        keyboard={true}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add Candidate Form |{" "}
            <small>
              Press <code>ESC</code> to exit.
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <form onSubmit={handleSubmit.bind(this)}>
            <div>
              <p className="card-description">
                Input basic candidate parameters
              </p>
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
                  <select
                    required={true}
                    className="form-control"
                    aria-label="voter_id"
                    aria-describedby="voter_id"
                    value={voter_id}
                    onChange={(e) => setVoter_id(e.target.value)}
                  >
                    <option value="">Select Voter</option>
                    {users &&
                      users.map((user) => (
                        <option value={user.id}>
                          {user.last_name + ", " + user.first_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {/* <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text bg-primary border-primary"
                      id="input-type-selector"
                    >
                      <i className="mdi mdi-view-list text-white"></i>
                    </span>
                  </div>
                  <select
                    required={true}
                    className="form-control"
                    aria-label="postion_id"
                    aria-describedby="postion_id"
                    value={positions_id}
                    onChange={(e) => setPositionss_id(e.target.value)}
                  >
                    <option value="">Select Positions</option>
                  </select>
                </div>
              </div> */}
            </div>
            <div className="float-right">
              <button type="submit" className="btn btn-success mx-1">
                Create
              </button>
              <button
                className="btn btn-warning mx-1"
                onClick={() => show.setShowAddCandidateModal(false)}
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
export default React.memo(AddCandidateModal);
