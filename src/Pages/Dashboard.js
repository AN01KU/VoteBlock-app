import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

// TODO:
// 1.check for current phase if 'final stage' :
//     enable voter to vote

const Dashboard = () => {
    return (
        <div className="wrapper ">
            <Sidebar />
            <div className="main-panel">
                <div className="content" style={{ marginTop: "20px !important" }} >
                    <div className="container" style={{ width: "850px" }}>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <h1>Candidate1</h1>
                                <button>Vote</button>
                            </div>
                            <div>
                                <h1>Candidate2</h1>
                                <button>Vote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
