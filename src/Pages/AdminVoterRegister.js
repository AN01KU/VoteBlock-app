import AdminSidebar from '../components/AdminSidebar.jsx'
import Contest from '../contracts/Contest.json'
import Web3 from 'web3';
import { useState, useEffect } from 'react';

// TODO:
// 1.add all voters in table format 
// 2.users whos isVerfied is pending -> complete the process with accountadd (blockchain ka)

export const AdminVoterRegister = () => {

  const [voterData, setvoterData] = useState([])

  useEffect(() => {
    (async () => {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const netID = await web3.eth.net.getId();
      const deployedNetwork = Contest.networks[netID]
      const contest = new web3.eth.Contract(
        Contest.abi,
        deployedNetwork.address
      )
      const voterCount = await contest.methods.votersCount().call()
      console.log(voterCount);
      for (var i = 1; i <= voterCount; i++) {
        const voter = await contest.methods.voters(i).call()
        console.log(voter)
        setvoterData(oldvoters => [...oldvoters, {
          name: voter.id,
          adhar: voter.adhar,
          address: voter.ads,
          hasVoted: voter.hasVoted

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
                            <th>Adhar Number</th>
                            <th>Vote Status</th>

                          </tr>
                        </thead>
                        <tbody >
                      {voterData.map((Data, idx) => (
                        <tr key={idx}>
                          <td>{Data.name}</td>
                          <td>{Data.address}</td>
                          <td>{Data.adhar}</td>
                          <td>{Data.hasVoted}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                      </table>
                    </div>

                    {/* <form>
                      <div className="form-group">
                        <input type="text" className="form-control" id="accadd" placeholder="Please Enter Voter Account Address here.." required />
                      </div>
                      <button type="submit" className="btn btn-success">Register</button>
                    </form> */}
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
