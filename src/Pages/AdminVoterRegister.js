import AdminSidebar from '../components/AdminSidebar.jsx'

// TODO:
// 1.add all voters in table format 
// 2.users whos isVerfied is pending -> complete the process with accountadd (blockchain ka)

export const AdminVoterRegister = () => {
  return (
    <div className="wrapper ">
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-success">
                    <h4 className="card-title">Voter Registration</h4>
                  </div>
                  <div className="card-body">
                    <div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>S.N</th>
                            <th>Account address</th>
                            <th>Is registered</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <form>
                      <div className="form-group">
                        <input type="text" className="form-control" id="accadd" placeholder="Please Enter Voter Account Address here.." required />
                      </div>
                      <button type="submit" className="btn btn-success">Register</button>
                    </form>
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
