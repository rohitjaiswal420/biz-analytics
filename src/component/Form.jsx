"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Form() {

    const [validation, setValidation] = useState({ name: -1, number: -1, email: -1, inquiries: -1 });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const phoneValidator = (inputtxt) => {

        let phoneno = /^\d{10}$/;
        if (inputtxt.match(phoneno)) {
            return true;
        }
        else {

            return false;
        }


    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const submitForm = async (e) => {

        e.preventDefault();
        const name = e.target.name.value.trim();
        const number = e.target.phone.value.trim();
        const email = e.target.email.value.trim();
        const inquiries = e.target.message.value.trim();
        let valid = true;
        let flag = [1, 1, 1, 1];

        if (name.length <= 2) {

            flag[0] = 0;
            valid = false;
        }


        if (!phoneValidator(number)) {

            flag[1] = 0;
            valid = false;
        }


        if (!validateEmail(email)) {

            flag[2] = 0;
            valid = false;
        }


        if (inquiries.length < 5) {
            flag[3] = 0;
            valid = false;
        }


        if (valid) {

            setValidation({ name: flag[0], number: flag[1], email: flag[2], inquiries: flag[3] });
            const option = {
                method: "POST",
                url: 'api/sendMail',
                data: {
                    name, email, number, inquiries
                }
            }

            setLoading(true);
            const response = await axios.request(option);
            setMessage(response.data.message);
            e.target.name.value = "";
            e.target.phone.value = "";
            e.target.email.value = "";
            e.target.message.value = "";
            setLoading(false);
            setTimeout(() => {
                setMessage("");
            }, 3000);


        }
        else {

            setValidation({ name: flag[0], number: flag[1], email: flag[2], inquiries: flag[3] });
        }



    }

   

    return (
        <form id="contact_form" name="contact_form" className="" onSubmit={submitForm} >
            <div className="row">
                <div className="col-sm-12 form-group">
                    <div className="mb-3">
                        <input name="name" className="form-control required" type="text" placeholder="Enter Name" style={{ border: validation.name === 0 && '1px solid red' }} />
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-sm-6 form-group">
                    <div className="mb-3">
                        <input name="email" className="form-control required email" type="email" placeholder="Enter Email" style={{ border: validation.email === 0 && '1px solid red' }} />
                    </div>
                </div>
                <div className="col-sm-6 form-group">
                    <div className="mb-3">
                        <input name="phone" className="form-control" type="text" placeholder="Enter Phone" style={{ border: validation.number === 0 && '1px solid red' }} />
                    </div>
                </div>
            </div>
            <div className="mb-3 form-group">
                <textarea name="message" className="form-control required" rows={7} placeholder="Enter Message" defaultValue={""} style={{ border: validation.inquiries === 0 && '1px solid red' }} />
            </div>
            <div className="mb-3 text-center">
                <input name="form_botcheck" className="form-control" type="hidden" defaultValue="" />

                {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div> </div> : <button type="submit" className="theme-btn btn-style-one me-2" data-loading-text="Please wait..." ><span className="btn-title">Send message</span></button>}
                {message !== "" && <div style={{ color: message !== "successfully sent!" ? 'red' : 'green', textAlign: 'center', marginTop: '7px' }}>{message}</div>}

              
            </div>
        </form>
    )
}
