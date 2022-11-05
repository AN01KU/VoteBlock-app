import { useRef, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { get, getDatabase, ref, set, child, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";


import Contest from '../contracts/Contest.json'
import Web3 from 'web3';

// TODO:
// 1.on register check if in db aadhar exists
//   if yes check if linked email same as curent user email
//     if yes do email verification using firebase auth 
//       update isVerified to pending 

export const Form = () => {

  const [address, Setaddress] = useState(0);

  const register = async () => {
    console.log("TEST0")
    {
      console.log("TEST1")

          
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const netID = await web3.eth.net.getId();
      console.log()
      const deployedNetwork =  Contest.networks[netID]
      console.log("TEST@" + deployedNetwork)

      const contest = new web3.eth.Contract(
          Contest.abi,
          "0xF0C0843f0d237FCFBca1bf7654e8226728E1f13E"
      )
        var add= address;
        console.log(add);
        //  await contest.deployed().then(function(instance){
        //   return instance.voterRegisteration(add);
        // }).then(function(result){
        //   console.log("Registered")
        // }).catch(function(err){
        //   console.error(err);
        // })

       await contest.methods.voterRegisteration(add).call(

        function(result){
            console.log("Registered")
          }).catch(function(err){
            console.error(err);
          }
       )


      // App1.contracts.Contest.deployed().then(function(instance){
      //   return instance.voterRegisteration(add);
      // }).then(function(result){
      //   console.log("Registered")
      // }).catch(function(err){
      //   console.error(err);
      // })
    

  }
}



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
                      <input type="text" id="party" className="form-control" name='account_address' onChange={(e) => Setaddress(e.target.value) } ref={account_addressRef} />
                      <label className="form-label" >Account Address</label>
                      <br />
                    </div>
                  </div>
                </div>
                <div>
                  <button type="submit" onClick={register} className="btn btn-info btn-block mb-4">Register</button>
                </div>
              </form>
            </div>
            <div id="loader">
              <button type="button"  className="close" data-dismiss="alert" aria-label="Close" />
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
