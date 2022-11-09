import { useRef, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getDatabase, ref, child, push, update, get, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';

export const Form = () => {
  const db = getDatabase();
  const aadharnoRef = useRef()
  const account_addressRef = useRef()
  const formRef = useRef()
  const [isRegistered, setIsRegistered] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("currentUserEmail") === '') {
      alert('No user found')
      navigate('/login')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    onValue(ref(db, 'aadharNos/'), (snapshot) => {
      let found = 0
      const data = snapshot.val()

      for (let id in data) {
        if (id === aadharnoRef.current.value) {
          if (data[id].email === localStorage.getItem('currentUserEmail')) {
            update(ref(db, 'aadharNos/' + aadharnoRef.current.value), {
              isRegistered: 'true',
              accountAdd: account_addressRef.current.value
            }).then(found = 1)
          }
        }
        if (found === 1) {
          setIsRegistered(true)
          formRef.current.reset()
        }
      }
    })
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <div className="container" style={{ width: "900px" }}>
          <div className="card">
            <div className="card-header card-header-info">
              <h4 className="card-title">REGISTERATION</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="row">
                  <div className="col">
                    <div className="form-outline">
                      <br />
                      <input type="text" id="name" className="form-control" name='aadharno' required ref={aadharnoRef} />
                      <label className="form-label" >Aadhar Number</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-outline">
                      <br />
                      <input type="text" id="party" className="form-control" name='account_address' ref={account_addressRef} />
                      <label className="form-label" >Account Address</label>
                      <br />
                    </div>
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-info btn-block mb-4">Register</button>
                </div>
              </form>
            </div>
          </div>
          {isRegistered && (
            <div><span>
              <b> Candidate </b> has been registered Successfully....!
            </span></div>
          )}
        </div>
      </div>
    </div>
  )
}
