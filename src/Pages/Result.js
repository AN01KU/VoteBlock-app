import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"
import loadWeb3 from "../context/Ethereum"

// TODO:
// 1.if election not over show "election not over yet"
// 2.show all candidates info with no of votes

const Result = ({ account }) => {
    const navigate = useNavigate()
    const [candidateData, setCandidateData] = useState([])
    const [currentPhase, setCurrentPhase] = useState('')

    useEffect(() => {
        if (localStorage.getItem("currentUserEmail") === '') {
            alert('No user found')
            navigate('/login')
        }

        (async () => {
            const contest = await loadWeb3();
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
            const phase = await contest.methods.currentPhase().call()
            setCurrentPhase(phase)

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
                                {currentPhase === 'registration' && (
                                    <h3 style={{ color: 'white' }}>Registration is still going</h3>
                                )}
                                {currentPhase === 'voting' && (
                                    <h3 style={{ color: 'white' }}>Voting is still going</h3>
                                )}
                                {currentPhase === 'results' && (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result