import { useRef, useState, useEffect } from "react"
import AdminSidebar from "../components/AdminSidebar"
import loadWeb3 from "../context/Ethereum"

const AdminHome = ({ account }) => {
    const nameRef = useRef()
    const partyRef = useRef()
    const ageRef = useRef()
    const qualificationRef = useRef()
    const [sucessfullyAdded, setSucessfullyAdded] = useState(false)
    const formRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value
        const party = partyRef.current.value
        const age = ageRef.current.value
        const qualification = qualificationRef.current.value

        const contest = await loadWeb3()

        await contest.methods.addCandidate(name, party, age, qualification).send({ from: account })
        setSucessfullyAdded(true)

        formRef.current.reset()
    }

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
                                    <form onSubmit={handleSubmit} ref={formRef}>
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
                            {sucessfullyAdded && (
                                <div><span>
                                    <b> Candidate </b> added Successfully....!
                                </span></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminHome