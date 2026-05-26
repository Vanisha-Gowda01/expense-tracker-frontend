import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful 🚀");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");

    }

  };


  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card p-4 shadow">

            <h2 className="text-center mb-4">

              Login

            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Login
              </button>

            </form>

            <p className="mt-3 text-center">

              Don't have an account?

              <Link to="/register">

                Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;