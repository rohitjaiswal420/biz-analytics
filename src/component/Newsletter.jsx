"use client"
import React from 'react'
import { useState } from 'react';
import {  faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Newsletter() {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState({ email: -1 })
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const submitForm = async (e) => {

        e.preventDefault();
        let valid = true;
        const email = e.target.email.value.trim();

        if (!validateEmail(email)) {
            valid = false;
        }

        if (valid) {

            setValidation({ email: 1 })
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createNewsletter`, { method: "POST", body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } });
            const res = await response.json();
            setLoading(false)
            setMessage(res.message);
            e.target.email.value = ""
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
        else {
            setValidation({ email: 0 })
        }


    }

    return (
        <div className="form-column">
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        className="email"
                        defaultValue=""
                        placeholder="Email Address"
                        required
                        style={{ border: validation.email === 0 && '1px solid red' }}
                    />

                    {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> </div> : <button type="submit" className="theme-btn" ><FontAwesomeIcon icon={faPaperPlane} /></button>}



                </div>
                {message !== "" && <div style={{ color: message !== "successfully sent!" ? 'red' : 'white', textAlign: 'center', marginTop: '7px' }}>{message}</div>}
            </form>
        </div>
    )
}
