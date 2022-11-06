import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"
import Contest from '../contracts/Contest.json'
import Web3 from 'web3'

// TODO:
// 1.if election not over show "election not over yet"
// 2.show all candidates info with no of votes

const Result = ({ account }) => {
    const navigate = useNavigate()
    const [candidateData, setCandidateData] = useState([])


    useEffect(() => {
        if (localStorage.getItem("currentUserEmail") === '') {
            alert('No user found')
            navigate('/login')
        }

        (async () => {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
            const netID = 5777;
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

                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-info">
                                        <h4 className="card-title">Results</h4>
                                    </div>
                                    <div className="card-body">

                                        <div id="renderTable">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Age</th>
                                                        <th scope="col">Party</th>
                                                        <th scope="col">Qualification</th>
                                                        <th scope="col">Votes</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="Results">
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
            </div>
        </div>
    )
}

export default Result