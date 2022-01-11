import React from "react";
import Header from "../components/header";
import axios from "axios";

const SettingsPage = () => {
  const token = localStorage.getItem("reactBlogID");
  const [details, setDetails] = React.useState({
    email: "",
    password: "",
    currPassword: "",
  });
  const [respMessage, setRespMessage] = React.useState({
    message: "",
    success: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("reactBlogID");
    window.location.href = "/login";
  };

  const handleDelete = async () => {
    await axios
      .delete(`/users/delete/${token}`)
      .then((res) => {
        if (res && res.status === 200) {
          localStorage.removeItem("reactBlogID");
          setRespMessage({ message: res.data.message, success: true });
          setTimeout(() => {
            window.location.href = "/signup";
          }, 2000);
        } else {
          setRespMessage({ message: res.data.message, success: false });
        }
      })
      .catch((err) => {
        console.log(err.response);
        setRespMessage({ message: err.response.data.message, success: false });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put("/users/resetPassword", details)
      .then((res) => {
        if (res.status === 201) {
          setRespMessage({ message: res.data.message, success: true });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          setRespMessage({ message: res.data.message, success: false });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setRespMessage({ message: err.response.data.message, success: false });
      });
  };

  return (
    <>
      <Header />
      <div className='page'>
        {respMessage.message.length > 0 && (
          <div className='row justify-content-center'>
            <div
              className='col-6 resp-message'
              style={{ color: `${respMessage.success ? "#1abc9c" : "red"}` }}>
              {respMessage.message}
            </div>
          </div>
        )}
        <div className='row justify-content-center'>
          <div className='col-6 login-form'>
            <form>
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
                  placeholder='Old Password'></input>
              </div>
              <div className='mb-3'>
                <input
                  type='password'
                  name='currPassword'
                  className='form-control details-input'
                  id='currPassword'
                  value={details.currPassword}
                  onChange={handleChange}
                  placeholder='New Password'></input>
              </div>
              <button
                type='submit'
                onClick={handleSubmit}
                style={{ background: "#1abc9c" }}
                className='btn'>
                Reset Password
              </button>
              <div>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='btn btn-primary mt-3 mx-2'>
                  Log out
                </button>
              </div>
              <div>
                <button
                  type='button'
                  onClick={handleDelete}
                  className='btn btn-danger mt-3 mx-2'>
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
