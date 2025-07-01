"use client"
import image1 from '../../../public/images/logo.png'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


function Page() {

  const [Message, setMessage] = useState("");
  const [succMessage, setSuccmessage] = useState(-1);
  const [loading,setLoading]=useState(false);
  const [formValidator, setFormvalidator] = useState([true, true, true]);
  const router=useRouter();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async(e) => {

    e.preventDefault();
    let arr = [true, true, true];

    if (e.target.name.value.trim().length < 3) {
      arr[0] = false;
    }

    
    if (e.target.password.value.trim().length < 8) {
      arr[2] = false;
    }

    setFormvalidator((data) => data.map((item, i) => {

      if (arr[i] === false) {
        return item = false;
      }
      else {
        return item = true;
      }

    }))

    if(arr[0] && arr[1] && arr[2])
    {

    setLoading(true);
    
    const data={
      name: e.target.name.value.trim(), password: e.target.password.value.trim() 
    }

    const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,{method:'POST',body:JSON.stringify(data),mode:'no-cors',headers:{"Content-Type": "application/json"}})
    const res=await response.json()
    setLoading(false);
      if (res.status === 1) {

        window.location.href = res.url
      
    
      }
      else {
        
        setSuccmessage(0);
        setMessage(res.message);
        setTimeout(() => {

          setMessage("");
          setSuccmessage(-1);

        }, 3000);
      }

  }

}


  return (
    <div className="auth-page-wrapper pt-5">
      {/* auth page bg */}
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        {/* <div className="bg-overlay" /> */}
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
          </svg>
        </div>
      </div>
      {/* auth page content */}
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="/" className="d-inline-block auth-logo">
                    <Image src={image1} alt="Logo" className="logo_width" height={90} />
                  </a>
                </div>
              
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4 card-bg-fill">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p className="text-muted">Sign in to continue to admin.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          name='name'
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                          required
                        />
                        <div className='invalid-feedback'>Please enter name</div>
                        {
                            formValidator[0] === false && <div className="text-danger" style={{ fontSize: '14px' }}>Please enter valid name</div>
                          }
                      </div>
                    
                      <div className="mb-3">
                      
                        <label className="form-label" htmlFor="password-input">
                          Password
                        </label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type="password"
                            name='password'
                            className="form-control pe-5 password-input"
                            placeholder="Enter password"
                            id="password-input"
                            required
                          />
                          <div className='invalid-feedback'>Please enter password</div>
                          {
                            formValidator[2] === false && <div className="text-danger" style={{ fontSize: '14px' }}>Please enter valid password</div>
                          }
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
                            type="button"
                            id="password-addon"
                          >
                            <i className="ri-eye-fill align-middle" />
                          </button>
                        </div>
                      </div>
                    

                      {

                        succMessage === -1 ?

                          loading ? <div style={{display:'flex',justifyContent:'center'}}><div className="spinner-border text-success" role="status">
                          <span className="sr-only">Loading...</span>
                          </div> </div>:
                          <div className="mt-4">
                            <button className="btn btn-success w-100" type="submit">
                              Sign In
                            </button>
                          </div> :
                          succMessage === 1 ?
                            <div style={{ color: 'green', textAlign: 'center' }}>{Message}</div> :
                            <div style={{ color: 'red', textAlign: 'center' }}>{Message}</div>
                      }
                      <div className="mt-4 text-center">
                        <div className="signin-other-title">
                          <h5 className="fs-13 mb-4 title">Sign In with</h5>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-primary btn-icon waves-effect waves-light me-2"
                          >
                            <i className="ri-facebook-fill fs-16" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-icon waves-effect waves-light me-2"
                          >
                            <i className="ri-google-fill fs-16" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark btn-icon waves-effect waves-light me-2"
                          >
                            <i className="ri-github-fill fs-16" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-info btn-icon waves-effect waves-light me-2"
                          >
                            <i className="ri-twitter-fill fs-16" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Don't have an account ?{" "}
                  <a
                    href="/"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Signup{" "}
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth page content */}
      {/* footer */}
     
     



      {/* end Footer */}
    </div>
  )
}

export default Page