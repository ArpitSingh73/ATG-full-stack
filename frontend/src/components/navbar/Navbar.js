import React from "react";
import { Link  } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Navbar() {
const navigate = useNavigate()
const handleLogout = () => {
 localStorage.removeItem("user")
  window.location.reload();
  navigate("/");
};



  return (
    <>
      <nav
        className="navbar navbar-expand-lg   bg-light-tertiary"
        style={{ background: "grey", height: "80px" }}
      >
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            ATG
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form
              className=" d-flex justify-content-around justify-content-sm-around  "
              role="search"
            >
              {JSON.parse(localStorage.getItem("user")) ? (
                <>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleLogout}
                  >
                    logOut
                  </button>

                  <Link to="/profile">
                    <button className="btn btn-primary  mx-2" type="submit">
                      myProfile
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/login">
                    <button className="btn btn-primary  mx-2" type="submit">
                      loGin
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-primary" type="submit">
                      signUp
                    </button>
                  </Link>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
