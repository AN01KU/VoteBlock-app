import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Contest from '../contracts/Contest.json'
import Web3 from 'web3';



// TODO:
// 1.check for current phase if 'final stage' :
//     enable voter to vote

const Dashboard = () => {
    const [candidateData, setCandidateData] = useState([])

  useEffect(() => {
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




    return (
        <div className="wrapper ">
            <Sidebar />
            <div className="main-panel">
                <div className="content" style={{ marginTop: "20px !important" }} >
                    <div className="container" style={{ width: "850px" }}>
                        <div style={{ display: 'flex' }}>
                            

                         {candidateData.map((candidate, idx) => (
                            <div key={idx}>
                                <h1> {candidate.id}</h1>
                                <h1>Candidate Name:  {candidate.name}</h1>
                                <h1>Candidate Age:  {candidate.name}</h1>
                                <h1>Candidate Party:  {candidate.name}</h1>
                               

                                <button>Vote</button>
                            </div>
                             
                      ))}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
