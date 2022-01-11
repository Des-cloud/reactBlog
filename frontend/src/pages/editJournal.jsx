import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditJournal = () => {
  const { journalID } = useParams();
  const history = useNavigate();

  const token = localStorage.getItem("reactBlogID");
  const [form, setForm] = useState({
    title: "",
    post: "",
  });

  const [submit, setSubmit] = useState(false);
  const [errors, setError] = useState({});
  const [isLoading, setLoading] = useState(true);

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
    await axios
      .put(`/edit/${token}/${journalID}`, form)
      .then((response) => {
        if (response.status === 201) {
          history("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (form.title && form.post) {
      setTimeout(() => setLoading(false), 200);
    }
  }, [form]);

  useEffect(() => {
    document.title = "Edit Journal";
    const getJournal = async () => {
      await axios
        .get(`/edit/${token}/${journalID}`)
        .then((res) => {
          if (res.status === 200) {
            setForm(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getJournal();
  }, [journalID, token]);

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
        {submit || isLoading ? (
          <div
            className='spinner-border circularProgress text-success'
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : (
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-9'>
                <h1>Edit</h1>
                <form className='form' onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input
                      type='text'
                      name='title'
                      id='title'
                      value={form.title}
                      className='form-control edit-title'
                      onChange={handleChange}
                    />
                    <label htmlFor='post'>Post</label>
                    <textarea
                      name='post'
                      id='post'
                      className='form-control edit-post'
                      rows='8'
                      value={form.post}
                      onChange={handleChange}></textarea>
                  </div>
                  <button type='submit' className='btn btn-lg btn-primary'>
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EditJournal;
