import React  ,{useState,useContext} from 'react';
import { Link } from "react-router-dom";
import authContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
  const { login } = useContext(authContext);
     const [credentials,setCredentials]=useState({
   
          email:"",
          password: ""
      });
      const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch("https://clothing-store-backcheck.onrender.com/api/auth/login",{
method:'POST',
headers:{
     'Content-Type': 'application/json',
},
 body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })


    });
 
      const json = await response.json();
 if(json.success){
 navigate("/")
  

login( json.authToken, json.user)
}
  else{

    }
  };
  
 

 const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <div data-mdb-input-init className="form-outline form-white mb-4">
 <input
  type="email"
  id="email"
  name="email"
  value={credentials.email}
  onChange={onChange}
  className="form-control form-control-lg"
  placeholder="Email"
/>


</div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                   <input
  type="password"
  id="password"
  name="password"
  value={credentials.password}
  onChange={onChange}
  className="form-control form-control-lg"
  placeholder="Password"
/>


                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <Link className="text-white-50"     to="/forgot-password">Forgot password?</Link>
                  </p>

                  <button 
                    data-mdb-button-init 
                    data-mdb-ripple-init 
                    className="btn btn-outline-light btn-lg px-5" 
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white mx-4 px-2"><i className="fab fa-twitter fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                  </div>

                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
