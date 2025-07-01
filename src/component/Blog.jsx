"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Tooltip from '@/component/Tooltip.jsx'
import AdminFooter from '@/component/AdminFooter.jsx'
export default function Page({ buttons, blogList, totalPages }) {


  const [popup, setPopup] = useState(false);
  const [deleteView, setDeleteview] = useState(-1);
  const [id, setId] = useState(null);
  const [blogLists, setBloglists] = useState(blogList);
  const [blogIdx, setBlogidx] = useState(1);
  const [blogPerpage, setBlogperPage] = useState(5);
  const [message, setMessage] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")
  const [name, setName] = useState("");


  useEffect(() => {


    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
        sessionStorage.removeItem('successMsg');
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [])

  const openPopup = (blogId) => {

    setDeleteview(1);
    setId(blogId);
    setPopup(true)
  }
  const deleteRecords = async (blogId) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createBlog`, {
      method: "DELETE",
      body: JSON.stringify({ blogId }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const res = await response.json();
    setDeleteview(0);
    if (res.status) {

      sessionStorage.setItem('successMsg', 'Blog deleted Successfully');
      window.location.href = "/admin/blog"


    }
  }


  const searching = async (idx, name) => {


    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createBlog/getBlog?page=${idx}&name=${name}`);
    setName(name);

    const res = await response.json();
    if (res.status) {
      setBloglists(res.bloglist);
      setButton(Math.ceil(res.totalItems / 10));
    }

  }


  const pagination = async (idx) => {


    if (idx > 0 && idx <= buttons) {

      setBlogidx(idx);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createBlog/getBlog?page=${idx}&name=${name}`, {
        method: 'GET',

      })

      const res = await response.json();
      if (res.status) {
        setBloglists(res.bloglist);
      }

    }



  }


  return (



    <div className="main-content">

      <div className="page-content">

        <div className="container-fluid">

          {message !== "" && <Tooltip message={message} />
          }

          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                <h4 className="mb-sm-0">Blogs List</h4>

              </div>
            </div>



          </div>
          {/* end page title */}
          <div className="row g-4 mb-3">
            <div className="col-sm-auto">
              <div>
                <Link href="/admin/blog/create" className="btn btn-success"><i className="ri-add-line align-bottom me-1" /> Add New</Link>
              </div>
            </div>
            <div className="col-sm">
              <div className="d-flex justify-content-sm-end">
                <div className="search-box ms-2">
                  <input type="text" className="form-control search" placeholder="Search..." onChange={(e) => searching(blogIdx, e.target.value)} />
                  <i className="ri-search-line search-icon" />
                </div>
              </div>
            </div>
            {/*  */}
          </div>
          {/* <div className="row">
  
  
  
              {blogList.length > 0 && blogList.map((item) =>
                <div className="col-xxl-3 col-lg-6" key={item.blogId}>
                  <div className="card overflow-hidden blog-grid-card">
                    <div className="position-relative overflow-hidden">
                      <img src={item.blogImage} alt="image not found" className="blog-img object-fit-cover" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title"><a href={`/admin/blog/view/${item.blogId}`} className="text-reset">{item.blogTitle}</a></h5>
                      <p className="text-muted mb-2">{item.blogDescription}</p>
                      <a href={`/admin/blog/view/${item.blogId}`} className="link link-primary text-decoration-underline link-offset-1">Read Post <i className="ri-arrow-right-up-line" /></a>
                    </div>
                  </div>
                </div>)}
  
            </div> */}

          {/*end row*/}


          <div className="row gx-4">
         
            {blogLists.length > 0 && blogLists.map((item) => <div key={item.blogId} className="col-xxl-12">
              <div className="card">
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-xxl-3 col-lg-5">
                      <img src={item.blogImage} alt className="img-fluid rounded w-100 object-fit-cover" />
                    </div>{/*end col*/}
                    <div className="col-xxl-9 col-lg-7">
                      <p className="mb-2 text-primary text-uppercase">{item.blogCategory}</p>
                      <Link href={`/admin/blog/view${item.blogUrl}`}>
                        <h5 className="fs-15 fw-semibold">{item.blogTitle}</h5>
                      </Link>
                      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                        <a href="#"> {item.blogStatus === false ? <span className="badge bg-warning-subtle text-warning">inactive</span> : <span className="badge bg-success-subtle text-success">active</span>}</a>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-3 flex-wrap">
                        <p className="text-muted mb-2">{item.blogDescription}</p>

                        <div className="d-flex gap-2">
                          <div className="edit">
                            <Link
                              className="btn btn-sm btn-success edit-item-btn"
                              href={`/admin/blog/view${item.blogUrl}`}
                            >
                              Edit
                            </Link>
                          </div>
                          <div className="remove">
                            <button className="btn btn-sm btn-danger remove-item-btn" onClick={() => openPopup(item.blogId)}>Remove</button>
                          </div>
                        </div>

                      </div>

                    </div>{/*end col*/}
                  </div>{/*end row*/}
                </div>
              </div>
            </div>)}

          </div>







          <div className="row g-0 text-center text-sm-start align-items-center mb-4">
            <div className="col-sm-6">
              <div>
                <p className="mb-sm-0 text-muted">Showing <span className="fw-semibold">{blogIdx * blogPerpage - blogPerpage === 0 ? 1 : blogIdx * blogPerpage - blogPerpage}</span> to <span className="fw-semibold">{blogPerpage * blogIdx}</span> of <span className="fw-semibold text-decoration-underline">{totalPages}</span> entries</p>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-6">
              {blogList.length > 0 &&
                <ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">

                  <li className="page-item">
                    <button className="page-link" onClick={() => pagination(blogIdx - 1)}>Previous</button >
                  </li>

                  {

                    Array.from({ length: buttons }, (_, i) => {

                      if (i + 1 <= buttons) {

                        return <li className="page-item active" key={i} >
                          <button className="page-link" onClick={() => pagination(i + 1)} style={{ backgroundColor: blogIdx === i + 1 && '#ff681a', border: 'none' }}  >{i + 1}</button>
                        </li>
                      }
                    })

                  }


                  <li className="page-item">
                    <button className="page-link" onClick={() => pagination(blogIdx + 1)}>Next</button >
                  </li>
                </ul>
              }
            </div>{/* end col */}
          </div>
        </div>
        {/* container-fluid */}
      </div>
      {/* End Page-content */}
      <div
        className={popup ? "modal fade zoomIn show" : "modal fade zoomIn"}
        id="deletetable"
        aria-hidden={!popup && 'true'}
        role={popup && 'dialog'}
        aria-modal={popup && 'true'}
        style={{ display: popup ? 'block' : 'none', backgroundColor: 'rgb(0,0,0,0.5)' }}



      >
        <div className="modal-dialog modal-dialog-centered">
          {deleteView === 1 && <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" aria-label="Close" id="btn-close" onClick={() => setPopup(false)} />
            </div>
            <div className="modal-body">
              <div className="mt-2 text-center">
                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ "width": "100px", "height": "100px" }} />
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you Sure ?</h4>
                  <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button type="button" className="btn w-sm btn-light" onClick={() => setPopup(false)}>Close</button>
                <button type="button" className="btn w-sm btn-danger " id="delete-record" onClick={() => deleteRecords(id)}>Yes, Delete It!</button>
              </div>
            </div>
          </div>}
        </div>
      </div>
      <AdminFooter />
    </div>

  )
}
