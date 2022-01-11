import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const HomePage = () => {
  const [data, setData] = React.useState([]);
  const [isError, setError] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const token = localStorage.getItem("reactBlogID");

  React.useEffect(() => {
    document.title = "All Blogs";
    const getJournals = async () => {
      await axios
        .get(`/journals/${token}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response);
        });
    };
    getJournals();
  }, [token]);

  React.useEffect(() => {
    if (data !== undefined && isLoading) {
      setTimeout(() => setLoading(!isLoading), 500);
    } else if (isError.length > 0 && isLoading) setLoading(false);
  }, [data, isLoading, isError]);

  if (isLoading) {
    return (
      <div className='page'>
        <Header />
        <main>
          <div className='title text-center'>
            <h1>All Journals</h1>
          </div>
          <div
            className='spinner-border circularProgress text-success'
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </main>
        <div className='footer-padding'></div>
        <Footer />
      </div>
    );
  } else if (isError) {
    return (
      <div className='page'>
        <Header />
        <main>
          <div className='title text-center'>
            Oooppsss an error was encountered!!!!!
          </div>
        </main>
        <div className='footer-padding'></div>
        <Footer />
      </div>
    );
  } else
    return (
      <>
        <div className='page'>
          <Header />
          <main>
            <div className='title text-center'>
              <h1>All Journals</h1>
            </div>
            <section className='entries'>
              {data.map((entry) => {
                return (
                  <div className='card' key={entry.id}>
                    <div className='card-body'>
                      <Link to={`/edit/${entry.id}`}>
                        <h2 className='card-title card-link'>{entry.title}</h2>
                      </Link>
                      <span className='card-date text-muted mb-2'>
                        {entry.year}-{entry.month}-{entry.day}
                      </span>
                      <p className='card-text'>
                        {entry.post.substr(0, 150)}...
                      </p>
                      <Link to={`/journal/${entry.id}`}>
                        <button
                          className='homeReadMore btn'
                          style={{ background: "#1abc9c" }}>
                          Read More...
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </section>
          </main>
          <div className='footer-padding'></div>
          <Footer />
        </div>
      </>
    );
};

export default HomePage;
