import Footer from "../components/footer";
import Header from "../components/header";
import React from "react";

const Error = () => {
  React.useEffect(() => {
    document.title = "Error";
  },[])
  return (
    <>
      <Header />
      <div className='row justify-content-center'>
        <div className='col-5 align-self-start image-404'>
          <img
            src='https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/1470175715831-NUJOMI6VW13ZNT1MI0VB/image-asset.jpeg'
            alt=''
          />
        </div>
        <div className='col-5 align-self-center error-404'>
          <h1 className='quote-header text-center'>Awww...Don't Cry.</h1>
          <p className='text-center quote-404'>
            You just got 404'D.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Error;
