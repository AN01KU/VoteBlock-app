import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import loadWeb3 from '../context/Ethereum';
import userLogo from '../assets/img/Sample_User_Icon.png'

// TODO:
// 1.check for current phase if 'final stage' :
//     enable voter to vote using candidateData to display

const Dashboard = ({ account }) => {
  const [candidateData, setCandidateData] = useState([])
  const navigate = useNavigate()
  const candidateIdRef = useRef()
  const formRef = useRef()
  const [currentPhase, setCurrentPhase] = useState('')

  useEffect(() => {
    if (localStorage.getItem("currentUserEmail") === '') {
      alert('No user found')
      navigate('/login')
    }

    (async () => {
      const contest = await loadWeb3()
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contest = await loadWeb3()
    await contest.methods.vote(candidateIdRef.current.value).send({ from: account })

    formRef.current.reset()
  }

  return (
    <div className="wrapper" >
      <Sidebar />
      <div className="main-panel">
        <div className="container" style={{ width: "900px" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-info">
                  <h4 className="card-title">Vote</h4>
                </div>
                {currentPhase === 'registration' ? (
                  <div className="container" style={{ width: "850px" }}>
                    <h1>Registation is still going!</h1>
                  </div>
                )
                  :
                  (
                    <div className="container" style={{ width: "850px" }}>
                      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {candidateData.map((element, key) => (
                          <div key={key}>
                            <h2>Candidate {element.id}</h2>
                            <img src={userLogo} alt='user-logo' style={{ width: '75px' }} />
                            <p>Name: {element.name}</p>
                            <p>Party: {element.party}</p>
                            <p>Age: {element.age}</p>
                            <p>Qualification: {element.qualification}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <form onSubmit={handleSubmit} ref={formRef}>
                          <div className="form-group">
                            Enter Candidate ID<input ref={candidateIdRef} />
                            <button type="submit" className="btn btn-info">Cast your vote</button>
                          </div>
                        </form>
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

export default Dashboard;
