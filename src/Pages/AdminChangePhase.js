import AdminSidebar from "../components/AdminSidebar"
import loadWeb3 from "../context/Ethereum"
import { useState, useEffect } from 'react'
import { async } from "@firebase/util"
// TODO:
// 1.functionality of changephase:
//   change it so that in voter side , they can vote 

const AdminChangePhase = ({ account }) => {
  const [currentPhase, setCurrentPhase] = useState()
  const [phase, setPhase] = useState('')
  useEffect(() => {
    (async()=>{
      const contest = await loadWeb3()
      const phase = await contest.methods.currentPhase().call()
      setCurrentPhase(phase)
    })()
  
  }, [])


  const handleSubmit = async()=>{
    const contest = await loadWeb3()
    if (currentPhase === 'registration'){
      await contest.methods.changePhase('voting').send({ from: account })
    } else if (currentPhase === 'voting'){
      await contest.methods.changePhase('results').send({ from: account })
    } else if (currentPhase === 'results'){
      await contest.methods.changePhase('registration').send({ from: account })
    }
    
  }
  
  return (
    <div className="wrapper ">
        <AdminSidebar/>
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-success">
                    <h4 className="card-title">CHANGE PHASE</h4>
                  </div>
                  <div className="card-body">
                    <div className="alert">
                      <span id="currentPhaseAdmin">Current phase is <b>{currentPhase}</b>.</span>
                    </div>
                    <button type="submit"  className="btn btn-success" onClick={handleSubmit}>Change Phase</button>
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

export default AdminChangePhase