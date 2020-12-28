import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import "bootstrap";
import ReactTooltip from "react-tooltip";
import api from "../api";
import AddPositionModal from "./AddPostionModal";
import AddCandidateModal from "./AddCandidateModal";
import AddVoterModal from "./AddVoterModal";

function ShowElectionModal({ show, id }) {
  const [election, setElection] = useState();

  const [needUpdate, setNeedUpdate] = useState(0);
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [showAddPositionModal, setShowAddPositionModal] = useState(false);
  const [showAddVoterModal, setShowAddVoterModal] = useState(false);
  const [election_id, setElection_id] = useState();
  const [position_id, setPosition_id] = useState();

  const addCandidate = (id) => {
    setPosition_id(id);
    setShowAddCandidateModal(true);
  };

  const addPosition = (id) => {
    setElection_id(id);
    setShowAddPositionModal(true);
  };
  
  const addVoter = (id) => {
    setElection_id(id);
    setShowAddVoterModal(true);
  };

  const deleteCandidate = (id) => {
    api
      .delete(`admin/candidate/delete/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.message);
          setNeedUpdate(needUpdate + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deletePosition = (id) => {
    api
      .delete(`admin/position/delete/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.message);
          setNeedUpdate(needUpdate + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteVoter = (id) => {
    api
      .delete(`admin/election-voter/delete/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.message);
          setNeedUpdate(needUpdate + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateElection = (id) => {
    api
      .delete(`admin/election/update/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.message);
          setNeedUpdate(needUpdate + 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    api
      .get(`admin/election/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setElection(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, needUpdate]);

  return (
    <>
      <Modal
        show={show.showElectionModal}
        size="xl"
        onHide={() => show.setShowElectionModal(false)}
        backdrop="static"
        keyboard={true}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Election Report |{" "}
            <small>
              Press <code>ESC</code> to exit.
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {election && (
            <div className="m-2">
              <button
                className="btn btn-sm btn-info float-right"
                onClick={() => updateElection(election.id)}
              >
                Update
              </button>
              <h6>
                Name : <code>{election.title}</code>
              </h6>
              <h6>
                Description : <code>{election.description}</code>
              </h6>
              <h6>
                Date created : <code>{election.created_at}</code>
              </h6>
              <h6>
                Status : <code>{}</code>
              </h6>
              <h6>
                Start Date : <code>{election.start_date}</code>
              </h6>
              <h6>
                End Date : <code>{election.end_date}</code>
              </h6>
              <hr />
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm m-2"
                  onClick={() => addPosition(election.id)}
                >
                  Add Position
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm m-2"
                  onClick={() => addVoter(election.id)}
                >
                  Add Voters
                </button>
              </div>

              <div className="row">
                <div className="accordion col-6" id="election_result">
                  <div className="card">
                    {election.positions.length ? (
                      election.positions.map((position, index) => (
                        <>
                          <div className="card-header" id="result" key={index}>
                            <h5 className="mb-0">
                              <button
                                className="btn btn-link text-decoration-none"
                                type="button"
                                data-toggle="collapse"
                                data-target={`#${position.name.replace(
                                  /[^A-Z0-9]/gi,
                                  ""
                                )}`}
                                aria-expanded="true"
                                aria-controls={position.name.replace(
                                  /[^A-Z0-9]/gi,
                                  ""
                                )}
                              >
                                <i className="fa fa-arrow-down"></i>
                                {position.name + " | " + position.description}
                              </button>
                              <button
                                className="btn btn-sm btn-warning float-right"
                                onClick={() => deletePosition(position.id)}
                              >
                                Delete
                              </button>
                            </h5>
                          </div>

                          <div
                            id={`${position.name.replace(/[^A-Z0-9]/gi, "")}`}
                            className="collapse"
                            aria-labelledby="result"
                            data-parent="#election_result"
                          >
                            <div className="card-body pt-0">
                              <div className="">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm m-2"
                                  onClick={() => addCandidate(position.id)}
                                >
                                  Add Candidate
                                </button>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-striped table-sm table-bordered text-center">
                                  <thead className="text-center">
                                    <tr>
                                      <th>Candidate</th>
                                      <th>Votes</th>
                                      <th>Remarks</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody className="text-center">
                                    {position.candidates.length ? (
                                      position.candidates.map(
                                        (candidate, index) => (
                                          <tr key={index}>
                                            <td>
                                              {candidate.users[0].last_name +
                                                ", " +
                                                candidate.users[0].first_name}
                                            </td>
                                            <td>{candidate.votes}</td>
                                            <td></td>
                                            <td>
                                              <button
                                                className="btn btn-sm btn-warning mx-1"
                                                onClick={() =>
                                                  deleteCandidate(candidate.id)
                                                }
                                              >
                                                Delete
                                              </button>
                                            </td>
                                          </tr>
                                        )
                                      )
                                    ) : (
                                      <td colspan="4">No Candidates</td>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    ) : (
                      <h4 className="text-center">No Position Added</h4>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <h4 className="my-2">Voters List</h4>
                  <table className="table table-striped table-sm table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Voted</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {election.users ? (
                        election.users.map((user, index) => (
                          <tr key={index}>
                            <th scope="row">{user.id}</th>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.pivot.voted? "Yes":"No"}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-warning"
                                onClick={() => deleteVoter(user.pivot.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <td>No Voters</td>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <ReactTooltip />
      </Modal>

      {showAddPositionModal && (
        <AddPositionModal
          show={{ showAddPositionModal, setShowAddPositionModal }}
          callBack={{ needUpdate, setNeedUpdate }}
          election={election_id}
        />
      )}
      {showAddCandidateModal && (
        <AddCandidateModal
          show={{ showAddCandidateModal, setShowAddCandidateModal }}
          callBack={{ needUpdate, setNeedUpdate }}
          position={position_id}
        />
      )}
      {showAddVoterModal && (
        <AddVoterModal
          show={{ showAddVoterModal, setShowAddVoterModal }}
          callBack={{ needUpdate, setNeedUpdate }}
          election={election_id}
        />
      )}
    </>
  );
}
export default React.memo(ShowElectionModal);
