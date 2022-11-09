import AdminSidebar from '../components/AdminSidebar.jsx'
import { useState, useEffect, useRef } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';
import loadWeb3 from "../context/Ethereum"
export const AdminVoterRegister = ({ account }) => {

  const [votersData, setVotersData] = useState([])
  const addressRef = useRef()

  const db = getDatabase()
  useEffect(() => {
    onValue(ref(db, 'aadharNos/'), snapshot => {
      const data = snapshot.val()
      Object.values(data).map(voter => {
        setVotersData(oldVoters => [...oldVoters, voter])
      })
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const contest = await loadWeb3()

    await contest.methods.voterRegisteration(addressRef.current.value).send({ from: account })
  }

  return (
    <div className="wrapper ">
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-success">
                    <h4 className="card-title">Voter Registration</h4>
                  </div>
                  <div className="card-body">
                    <div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S.N</th>
                            <th>Account address</th>
                            <th>Registration Status</th>
                          </tr>
                        </thead>
                        <tbody >
                          {votersData.map((voter, idx) => (
                            <tr key={idx}>
                              <td>{idx}</td>
                              <td>{voter.accountAdd}</td>
                              <td>{voter.isRegistered}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input type="text" className="form-control" id="accadd" placeholder="Please Enter Voter Account Address here.." required ref={addressRef} />
                      </div>
                      <button type="submit" className="btn btn-success">Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
