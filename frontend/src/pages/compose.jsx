import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Compose = () => {
  const history = useNavigate();
  const [form, setForm] = useState({
    title: "",
    post: "",
  });

  const [submit, setSubmit] = useState(false);
  const [errors, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = validate();
    setError(err);
    setSubmit(true);
  };

  const validate = () => {
    let err = {};
    if (!form.post) {
      err.description = "Entry cannot be empty.";
    }
    return err;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const publishJournal = async () => {
    const token = localStorage.getItem("reactBlogID");
    await axios
      .post(`/journals/${token}`, form)
      .then((response) => {
        if (response.status === 200) {
          history("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    document.title = "Compose";
  }, [])
  useEffect(() => {
    if (submit) {
      if (Object.keys(errors).length === 0) {
        publishJournal();
      } else {
        setSubmit(false);
        alert("Post cannot be empty");
      }
    }
  }, [errors, submit]);

  return (
    <div className='page'>
      <Header />
      <main>
        {submit ? (
          <div
            className='spinner-border circularProgress text-success'
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : (
          <h1 className='container-fluid'>
            <div className='row'>
              <div className='col-lg-9'>
                <h1>Compose</h1>
                <form className='form' onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                      type='text'
                      name='title'
                      id='title'
                      placeholder='Title'
                      value={form.title}
                      className='form-control'
                      onChange={handleChange}
                    />

                    <label htmlFor='post'>Post</label>
                    <textarea
                      name='post'
                      id='post'
                      value={form.post}
                      className='form-control'
                      rows='8'
                      onChange={handleChange}></textarea>
                  </div>

                  <button type='submit' className='btn btn-lg'>
                    Publish
                  </button>
                </form>
              </div>
            </div>
          </h1>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Compose;
