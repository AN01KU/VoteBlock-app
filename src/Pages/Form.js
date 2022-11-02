import { useRef, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { get, getDatabase, ref, set, child, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO:
// 1.on register check if in db aadhar exists
//   if yes check if linked email same as curent user email
//     if yes do email verification using firebase auth 
//       update isVerified to pending 

export const Form = () => {
  const database = getDatabase()
  const aadharnoRef = useRef()
  const account_addressRef = useRef()
  const formRef = useRef()
  const [isRegistered, setIsRegistered] = useState(false)
  const auth = getAuth()

  const handleSubmit = (e) => {
    e.preventDefault()

    onValue(ref(database, 'aadharNos/'), (snapshot) => {
      const data = snapshot.val()
      for (let id in data) {
        if (id === aadharnoRef.current.value) {
          if (data[id].email === auth.currentUser.email) {
            update(ref(database, 'aadharNos/' + id + '/'), {
              isVerified: 'pending'
            })
          }
        }
      }
      setIsRegistered(true)
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
                      <input type="text" id="party" className="form-control" name='account_address' required ref={account_addressRef} />
                      <label className="form-label" >Account Address</label>
                      <br />
                    </div>
                  </div>
                </div>
                <div>
                  <button type="submit" className="btn btn-info btn-block mb-4" disabled={isRegistered}>Register</button>
                </div>
              </form>
            </div>
            <div id="loader">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" />
              <div>
              </div>
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
