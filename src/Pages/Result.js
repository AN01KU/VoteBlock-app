import Sidebar from "../components/Sidebar"

// TODO:
// 1.if election not over show "election not over yet"
// 2.show all candidates info with no of votes

const Result = () => {
    return (
        <div className="wrapper ">
            <Sidebar />
            <div className="main-panel">

                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-info">
                                        <h4 className="card-title">Results</h4>
                                    </div>
                                    <div className="card-body">
                                        <div id="not">
                                            <h1>Election is Not Over Yet!!!!!</h1>
                                        </div>
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
                                                </tbody>
                                                {/* <p id="accountAddress" className="text-center"></p> */}
                                            </table>
                                        </div>
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

export default Result