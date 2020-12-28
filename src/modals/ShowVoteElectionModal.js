import React, { Fragment, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Test, QuestionGroup, Question, Option } from "react-multiple-choice";
import ReactTooltip from "react-tooltip";
import api from "../api";

function ShowVoteElectionModal({ show, id }) {
  const [election, setElection] = useState();

  const [needUpdate, setNeedUpdate] = useState(0);
  const [answer, setAnswer] = useState({});

  const submitVote = () => {
    console.log(answer);

  }
  useEffect(() => {
    api
      .get(`user/election/${id}`)
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

  const style = {
    textAlign: "center",
    display: "block",
    fontSize: "1.5em",
    marginBlockStart: "0.83em",
    marginBlockEnd: "0.83em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold",
  };

  return (
    <>
      <Modal
        show={show.showVoteElectionModal}
        size="xl"
        onHide={() => show.setShowVoteElectionModal(false)}
        backdrop="static"
        keyboard={true}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Election Ballot | {election && election.description}
            <small>
              Press <code>ESC</code> to exit.
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
        {election && 
          <div className="text-center">
                <div className="text-left m-3">
                  <h5>Title: {election.title}</h5>
                  <p>Description: {election.description}</p>
                </div>
            <Test
              onOptionSelect={(answers) => setAnswer(answers)}
            >
              {election.positions.map((position, index) => (
                  <QuestionGroup questionNumber={position.id} key={position.id}>
                    <Question style={style}>{index+1}. {position.name}</Question>
                    {position.candidates.map((candidate) => 
                        <Option value={candidate.users[0].id} key={candidate.id}>{candidate.users[0].first_name + " "+ candidate.users[0].last_name}</Option>
                    )}
                  </QuestionGroup>
                ))}
            </Test>
                      <hr/>

            <div className="text-center float-right">
              <button className="btn btn-primary m-2" onClick={submitVote}>Submit</button>
              <button className="btn btn-dark m-2">Cancel</button>
            </div>
          </div>
        }
        </Modal.Body>
        <ReactTooltip />
      </Modal>
    </>
  );
}
export default React.memo(ShowVoteElectionModal);
