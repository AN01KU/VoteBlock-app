import AdminSidebar from '../components/AdminSidebar'
import CandidatesTable from '../components/CandidatesTable'

// TODO:
// 1.show all candidate info (fetch from blockchain) , no energy cost

const AdminCandidateDetail = () => {

  return (
    <div className="wrapper ">
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header card-header-success">
                <h4 className="card-title">Candidate Details</h4>
              </div>
              <div className="card-body">
                <div>
                  <CandidatesTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCandidateDetail
