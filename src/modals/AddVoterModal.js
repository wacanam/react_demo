import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import api from "../api";

function AddVoterModal({ show, callBack, election }) {
  const [user_id, setUser_id] = useState();

  const [users, setUsers] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user_id) {
      api
        .post("admin/election-voter/store", {
          user_id,
          election_id : election
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log("Saved");
            show.setShowAddVoterModal(false);
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
        show={show.showAddVoterModal}
        size="lg"
        onHide={() => show.setShowAddVoterModal(false)}
        backdrop="static"
        keyboard={true}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add Voter Form |{" "}
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
                    aria-label="user_id"
                    aria-describedby="user_id"
                    value={user_id}
                    onChange={(e) => setUser_id(e.target.value)}
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
            </div>
            <div className="float-right">
              <button type="submit" className="btn btn-success mx-1">
                Create
              </button>
              <button
                className="btn btn-warning mx-1"
                onClick={() => show.setShowAddVoterModal(false)}
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
export default React.memo(AddVoterModal);
