function Footer() {
  return (
    <>
      <div className="mt-3 bg-dark"></div>
      <footer className="footer mt-auto py-3 font-small blue pt-4 text-white bg-dark">
        <div className="container-fluid text-center text-md-left bg-dark row p-2">
          <div className="col-md-6 mb-md-0 my-3 bg-dark mb-md-2">
            <h6 className="mb-4 font-weight-bold bg-dark">
              Alumno: Santiago Risso
            </h6>
          </div>
          <div className="col-md-6 mb-md-0 bg-dark">
            <h6 className="text-uppercase pb-3 pt-md-3 m-0 font-weight-bold bg-dark">
              <a
                href="https://fakeapi.platzi.com/"
                className="link-light link-opacity-50-hover link-underline-opacity-50-hover link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover"
              >
                Platzi Fake Store API
              </a>
            </h6>
          </div>
        </div>
        <div className="text-center  bg-black text-light p-4">
          © 2023 Informatorio
        </div>
      </footer>
    </>
  );
}

export default Footer;
