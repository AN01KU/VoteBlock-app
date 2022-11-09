import AdminSidebar from "../components/AdminSidebar"

// TODO:
// 1.functionality of changephase:
//   change it so that in voter side , they can vote 

const AdminChangePhase = () => {
  return (
    <div className="wrapper ">
        <AdminSidebar/>
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-success">
                    <h4 className="card-title">CHANGE PHASE</h4>
                  </div>
                  <div className="card-body">
                    <div className="alert">
                      <span id="currentPhaseAdmin"> </span>
                    </div>
                    <button type="submit"  className="btn btn-success" >Change Phase</button>
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

export default AdminChangePhase