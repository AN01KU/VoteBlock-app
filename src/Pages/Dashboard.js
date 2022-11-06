import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Contest from '../contracts/Contest.json'
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';



// TODO:
// 1.check for current phase if 'final stage' :
//     enable voter to vote

const Dashboard = () => {
  const [candidateData, setCandidateData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("currentUserEmail") === '') {
      alert('No user found')
      navigate('/login')
    }


    (async () => {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const netID = await web3.eth.net.getId();
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


  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="wrapper ">
      <Sidebar />
      <div className="main-panel">
        <div className="content" style={{ marginTop: "20px !important" }}>
          <div className="container" style={{ width: "850px" }}>
            <div id="currentPhase">
            </div>
            <div>
              {candidateData.map((candidate, idx) => (
                <div key={idx}>
                  <p>{candidate.id}</p>
                  <p>{candidate.name}</p>
                  <p>{candidate.age}</p>
                  <p>{candidate.party}</p>
                  <p>{candidate.qualification}</p>
                  <p>{candidate.voteCount}</p>
                </div>
              ))}
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contestantSelect">Select Contestant : </label>
                  <button type="submit" className="btn btn-info">Cast your vote</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
