import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";
import api, { setAuthHeaderToken } from "../../api";
import AddElectionModal from '../../modals/AddElectionModal';
import EditElectionModal from '../../modals/EditElectionModal';
import ShowElectionModal from "../../modals/ShowElectionModal";

const Dashboard = () => {

  const authData = useAuth();

  const [needUpdate, setNeedUpdate] = useState(0);
  const [showAddElectionModal, setShowAddElectionModal] = useState(false);
  const [showEditElectionModal, setShowEditElectionModal] = useState(false);
  const [showElectionModal, setShowElectionModal] = useState(false);
  const [elections, setElections] = useState([]);
  const [election, setElection] = useState();

  const handleLogout = () => {
    api
      .get("admin/logout")
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          authData.setAuthToken(null);
          setAuthHeaderToken(false);
        }
      })
      .catch((error) => console.error(error));
  };
  const deleteElection = (id) => {
    api.delete(`admin/election/delete/${id}`).then(res => {
      console.log(res);
      if(res.status === 200){
        setNeedUpdate(needUpdate + 1);
      }
    })
      
  }
  const editElection = (election) => {
    setElection(election);
    setShowEditElectionModal(true);
  }
  const showElection = (id) => {
    setElection(id);
    setShowElectionModal(true);
  }

  useEffect(() => {
    api
      .get(`admin/election/get/${authData.authToken.user.id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setElections(res.data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [needUpdate]);

  return authData && authData.authToken.user.role !== "admin" ? (
    <Redirect exact to="/" />
  ) : (
    <div>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">CRUD Election System</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="#">
            Elections
          </a>
          <button
            className="btn btn-outline-success"
            onClick={() => setShowAddElectionModal(true)}
          >
            Create Election
          </button>
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
                      <button className="btn btn-sm btn-warning mx-1" onClick={() => deleteElection(election.id)}>Delete</button>
                      <button className="btn btn-sm btn-info mx-1" onClick={() => editElection(election)}>Edit</button>
                      <button className="btn btn-sm btn-success mx-1" onClick={() => showElection(election.id)}>Show</button>
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
      {showElectionModal && <ShowElectionModal show={{showElectionModal, setShowElectionModal}}  id={election}/>}
      {showAddElectionModal && <AddElectionModal show={{showAddElectionModal, setShowAddElectionModal}} callBack={{needUpdate,setNeedUpdate}}/>}
      {showEditElectionModal && <EditElectionModal show={{showEditElectionModal, setShowEditElectionModal}} election={election} callBack={{needUpdate,setNeedUpdate}}/>}
    </div>
  );
};
export default React.memo(Dashboard);
