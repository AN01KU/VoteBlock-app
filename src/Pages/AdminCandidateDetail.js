import { useState, useEffect } from "react"
import AdminSidebar from '../components/AdminSidebar'
import CandidatesTable from '../components/CandidatesTable'
import Contest from '../contracts/Contest.json'
import Web3 from 'web3';

const AdminCandidateDetail = () => {

  const [candidateData, setCandidateData] = useState([])

  useEffect(() => {
    (async () => {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const netID =5777;
      const deployedNetwork = Contest.networks[netID]
      const contest = new web3.eth.Contract(
        Contest.abi,
        deployedNetwork.address
      )
      const candidateCount = await contest.methods.contestantsCount().call()
      for (var i = 1; i <= candidateCount; i++) {
        const candidate = await contest.methods.contestants(i).call()
        setCandidateData(oldCandidates => [...oldCandidates, {
          name: candidate.name,
          age: candidate.age,
          qualification: candidate.qualification,
          party: candidate.party,
          id: candidate.id,
          voteCount: candidate.voteCount,
        }])
      }

    })()

  }, [])

  return (
    <div className="wrapper ">
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header card-header-success">
                <h4 className="card-title">Candidate Details</h4>
              </div>
              <div className="card-body">
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th >Name</th>
                        <th >Age</th>
                        <th >Party</th>
                        <th >Qualification</th>
                        <th >Votes</th></tr>
                    </thead>
                    <tbody id="contestantsResultsAdmin">
                      {candidateData.map((candidate, idx) => (
                        <tr key={idx}>
                          <td>{candidate.id}</td>
                          <td>{candidate.name}</td>
                          <td>{candidate.age}</td>
                          <td>{candidate.party}</td>
                          <td>{candidate.qualification}</td>
                          <td>{candidate.voteCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCandidateDetail
