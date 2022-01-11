import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import Modal from "../components/modal";

const Journal = () => {
  const { journalID } = useParams();
  const [data, setData] = React.useState({
    title: "",
    post: "",
    year: "",
    month: "",
    day: "",
  });
  const [isLoading, setLoading] = React.useState(true);
  const token = localStorage.getItem("reactBlogID");

  React.useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/edit/${token}/${journalID}`)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getData();
  }, [journalID, token]);

  React.useEffect(() => {
    document.title = data.title;
    if (data !== undefined && isLoading) {
      setTimeout(() => setLoading(!isLoading), 300);
    }
  }, [isLoading, data]);

  return (
    <div className='page'>
      <Header />
      <main>
        {isLoading ? (
          <div
            className='spinner-border circularProgress text-success'
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : (
          <article>
            <div className='title journalTitle'>
              <h1>{data.title}</h1>
            </div>
            <span className='card-date text-primary font-weight-bolder mb-2'>
              {data.year}-{data.month}-{data.day}
            </span>

            <div className='content'>{data.post}</div>
            <Link to={`/edit/${data.id}`}>
              <button type='button' className='btn btn-primary'>
                Edit
              </button>
            </Link>
            <button
              type='button'
              className='btn del btn-danger'
              data-toggle='modal'
              data-target='#deleteModal'>
              Delete
            </button>
            <Modal token={token} journalID={journalID} />
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Journal;
