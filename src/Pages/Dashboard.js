import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import loadWeb3 from '../context/Ethereum';
import CandProfile from '../components/CandProfile'
import '../css/profile.css';


// TODO:
// 1.check for current phase if 'final stage' :
//     enable voter to vote using candidateData to display

const Dashboard = ({ account }) => {
  const [candidateData, setCandidateData] = useState([])
  const navigate = useNavigate()
  const candidateIdRef = useRef()
  const formRef = useRef()
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

    })()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contest = await loadWeb3()
    await contest.methods.vote(candidateIdRef.current.value).send({ from: account })

    formRef.current.reset()
  }

  return (
    <div className="wrapper ">
      <Sidebar />
      <div className="main-panel">
        <div className="content" style={{ marginTop: "20px !important" }}>
          <div className="container" style={{ width: "850px" }}>
          <div className="minhold">
          

             {candidateData.map((candidate, idx) => (
               <div className='containerSide' key={idx}>
                   <CandProfile
                    key = {idx}
                    id= {candidate.id}
                    name = {candidate.name}
                    age = {candidate.age}
                    party = {candidate.party}
                    qualification= {candidate.qualification} 
                    votes = {candidate.voteCount}
                    account = {account} />
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
