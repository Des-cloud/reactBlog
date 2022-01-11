const Spinner = () => {
  return (
    <>
      <div className="text-center">
        <div className="spinner-border spinner-border-lg" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        {/* <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div> */}
      </div>
    </>
  );
};

export default Spinner;
