import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { useState, useEffect } from "react";

const CandidatesTable = () => {

    const database = getDatabase()
    const [candidates, setCandidates] = useState([])
    useEffect(() => {
        onValue(ref(database, 'candidates/',),(snapshot)=>{
            const data = snapshot.val()
            const dataList = []
            for (let id in data){
                dataList.push(data[id])
            }
            setCandidates(dataList)
        })

    }, [])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th >Name</th>
                    <th >Age</th>
                    <th >Party</th>
                    <th >Qualification</th>
                    <th >Votes</th></tr>
            </thead>
            <tbody id="contestantsResultsAdmin">
                
            </tbody>
        </table>
    )
}

export default CandidatesTable