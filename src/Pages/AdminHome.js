import { useRef, useState, useEffect } from "react"
import AdminSidebar from "../components/AdminSidebar"
import Contest from '../contracts/Contest.json'
import Web3 from 'web3';
// TODO:
// 1.on 'add' click store values in blockchain

const AdminHome = ({ account }) => {
    const nameRef = useRef()
    const partyRef = useRef()
    const ageRef = useRef()
    const qualificationRef = useRef()
    const [sucessfullyAdded, setSucessfullyAdded] = useState(false)
    
    useEffect(() => {
      (async()=>{
          
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const netID = await web3.eth.net.getId();
        const deployedNetwork =  Contest.networks[netID]
        console.log("TEST@" + deployedNetwork)

        const contest = new web3.eth.Contract(
            Contest.abi,
            deployedNetwork.address
        )
        const count = await contest.methods.contestantsCount().call()
        console.log(count);
      })
    }, [])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const candidate = {
            name: nameRef.current.value,
            party: partyRef.current.value,
            age: ageRef.current.value,
            qualification: qualificationRef.current.value,
            votes: 0
        }
    }

  console.log(account);
    
    return (
        <div>
            <div className="wrapper ">
                <AdminSidebar />
                <div className="main-panel">
                    <div className="content">
                        <div className="container" >
                            <div className="card">
                                <div className="card-header card-header-success">
                                    <h4 className="card-title">Add Candidate Information</h4>
                                </div>
                                <br />
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-4">
                                            <div className="col">
                                                <div className="form-outline">
                                                    <input type="text" id="name" className="form-control" required ref={nameRef} />
                                                    <label className="form-label">Name</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-outline">
                                                    <input type="text" id="party" className="form-control" required ref={partyRef} />
                                                    <label className="form-label">Party</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col">
                                                <div className="form-outline">
                                                    <input type="text" id="age" className="form-control" required ref={ageRef} />
                                                    <label className="form-label">Age</label>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-outline">
                                                    <input type="text" id="qualification" className="form-control" required ref={qualificationRef} />
                                                    <label className="form-label">Qualification</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block mb-4" disabled={sucessfullyAdded} >Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminHome