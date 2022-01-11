import React from "react";
import Header from "../components/header";
import axios from "axios";

const LoginPage = ({ authType }) => {
  const [details, setDetails] = React.useState({ email: "", password: "" });
  const [isError, setError] = React.useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authType === "signup") {
      await axios
        .post("/users/signup", details)
        .then((res) => {
          if (res.data) {
            setError("Sign up successful");
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } else {
      await axios
        .post("/users/signin", details)
        .then((res) => {
          if (res.status === 200 && res.data && res.data.id) {
            localStorage.setItem("reactBlogID", res.data.id);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  };

  React.useEffect(() => {
    if (authType) {
      document.title = authType === "login" ? "Login" : "Sign up";
    }
  }, [authType]);

  const loginImgUrl =
    "https://i.pinimg.com/originals/82/91/9f/82919f7871b92a0ec0a19eb565676732.jpg";
  const signupImgUrl =
    "https://static01.nyt.com/images/2020/08/30/multimedia/30ah-journal/30ah-journal-superJumbo.jpg";
  return (
    <>
      <Header />
      <div className='page'>
        <div className='row row align-items-center justify-content-around'>
          <div className='col-6 login-logo'>
            <img
              src={authType === "login" ? loginImgUrl : signupImgUrl}
              alt=''
            />
          </div>
          <div className='col-5 login-form'>
            {isError && (
              <div className='title' style={{ color: "red", fontSize: "14px" }}>
                {isError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <input
                  type='email'
                  name='email'
                  className='form-control details-input'
                  id='email'
                  value={details.email}
                  onChange={handleChange}
                  placeholder='Email Address'></input>
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  name='password'
                  className='form-control details-input'
                  id='password'
                  value={details.password}
                  onChange={handleChange}
                  placeholder='Password'></input>
              </div>
              <button
                type='submit'
                style={{ background: "#1abc9c" }}
                className='btn'>
                {authType === "login" ? "Sign In" : "Sign Up"}
              </button>
              <p className='switch-login'>
                {authType === "login" ? (
                  <a
                    href='/signup'
                    onClick={() => {
                      window.location.href = "/signup";
                    }}>
                    Don't have an account? Sign Up.
                  </a>
                ) : (
                  <a
                    href='/login'
                    onClick={() => {
                      window.location.href = "/login";
                    }}>
                    Have an account? Sign in.
                  </a>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
