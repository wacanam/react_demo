import React, {useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";
import api, { setAuthHeaderToken } from "../../api";
import ShowVoteElectionModal from "../../modals/ShowVoteElectionModal";

const Dashboard = () => {

  const authData = useAuth();

  const [needUpdate, setNeedUpdate] = useState(0);
  const [elections, setElections] = useState(0);
  const [election, setElection] = useState(0);
  const [showVoteElectionModal, setShowVoteElectionModal] = useState(false);

  const handleLogout = () => {
    api
      .get("user/logout")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
            authData.setAuthToken(null);
            setAuthHeaderToken(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const voteElection = (id) => {
    setElection(id);
    setShowVoteElectionModal(true);
  }

  useEffect(() => {
    api
      .get(`user/${authData.authToken.user.id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setElections(res.data.data.elections);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [needUpdate]);
  
  return authData && authData.authToken.user.role !== "voter" ? (
    <Redirect exact to="/admin" />
  ) : (
    <div>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">CRUD Election System</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="#">
            Elections
          </a>
        </nav>
        <button className="btn btn-outline-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Election Name</th>
                <th>Description</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {elections && elections.length? (
                elections.map((election, index) => (
                  <tr key={index}>
                    <td>{election.id}</td>
                    <td>{election.title}</td>
                    <td>{election.description}</td>
                    <td>{election.created_at}</td>
                    <td>
                      <button className="btn btn-sm btn-info mx-1" onClick={() => voteElection(election.id)}>Vote</button>
                    </td>
                  </tr>
                ))
              ) : (
                <td colSpan="5" className="text-center">No Election found!</td>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showVoteElectionModal && <ShowVoteElectionModal show={{showVoteElectionModal, setShowVoteElectionModal}}  id={election}/>}
    </div>
    
  );
}
export default React.memo(Dashboard);
