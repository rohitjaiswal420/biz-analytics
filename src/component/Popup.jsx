"use client"
import React from 'react'
import Form from './Form'
export default function Popup({popup}) {
    
    return (
        <div
            className="modal fade customModal show"
            id="bookAppointmentModal"
            tabIndex={-1}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="bookAppointmentModalClose"
            aria-modal="true"
            role="dialog"
            style={{ display: "block" ,backgroundColor:'rgb(0,0,0,0.4)'}}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="bookAppointmentModalClose">
                            <span>Get free quote?</span> Fill details and we will get back to you
                            soon.
                        </h5>
                        <button
                            type="button"
                            className="btnClose"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={()=>popup(false)}
                        >
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="col-md-6 modalImg">
                            <div className="modalImgSec" />
                        </div>
                        <div className="col-md-6 col-12">
                            {/* <form className="row customForm">
                                <div className="col-md-12">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="contact" className="form-label">
                                        Contact No.
                                    </label>
                                    <input type="text" className="form-control" id="contact" />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="email" className="form-label">
                                        Your Email
                                    </label>
                                    <input type="email" className="form-control" id="email" />
                                </div>
                                <div className="col-md-6 col-12 pe-md-2">
                                    <label htmlFor="suburb" className="form-label">
                                        Suburb
                                    </label>
                                    <input type="text" className="form-control" id="suburb" />
                                </div>
                                <div className="col-md-6 col-12 ps-md-2">
                                    <label htmlFor="zip" className="form-label">
                                        Zip Code
                                    </label>
                                    <input type="text" className="form-control" id="zip" />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="query" className="form-label">
                                        Your Query
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="query"
                                        rows={3}
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn customBtn w-100">
                                        Submit
                                    </button>
                                </div>
                            </form> */}
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
