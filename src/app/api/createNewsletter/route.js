"use server"
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { newsletterModel } from "../../models/newsletter.model";

const transport = nodemailer.createTransport({

    service: 'gmail',
    auth: {

        user: "rohitkumarchau656@gmail.com",
        pass: "pihc knoi rbca lrif"

    }
})



const sendMail = async (email) => {

    const config = {

        from: "Idhika Holidays",
        to: email,
        subject: "welcome from Idhika holidays",
        html: `<div style="/* justify-content: center; */font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;max-width:600px;display:block;margin:0 auto;padding:20px;/* display: flex; *//* align-items: center; */"><div class="adM">
                                              </div><table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;border-radius:3px;margin:0;border:none">
                                                  <tbody><tr style="font-family:'Roboto',sans-serif;font-size:14px;margin:0">
                                                      <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;color:#495057;font-size:14px;vertical-align:top;margin:0;padding:30px;border-radius:7px;background-color:#fff" valign="top">
                                                          
                                                          <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                              <tbody><tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;width: 100%;">
                                                                  <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
                                                                      <div style="text-align:center;margin-bottom:15px">
                                                                          <img src="https://idhikaholidays.com/assets/img/idhika-holidays.png" alt="image not found" height="100" width="100" class="CToWUd" data-bit="iit">
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                              <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                  <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;line-height:1.5;font-size:24px;vertical-align:top;margin:0;padding:0 0 10px;text-align:center;font-weight:500" valign="top">
                                                                      Thankyou for subscribing us 
                                                                  </td>
                                                              </tr>
                                                              <tr style="align-items: center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;display: flex;/* align-content: center; */">
                                                                  <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:center" valign="top">
                                                                    
                                                                  <a style="background-color:'green';color:'white'; border:'none';" href=http://localhost:3000/?email=${email}>verify</a>
  
  
                                                                  </td>
                                                              </tr>
                                                             
  
                                                              <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;border-top:1px solid #e9ebec;display: flex;">
                                                                  <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                     <p> Our Headquarter </p>
                                             <p> C - 50 Noida Sec - 2 Uttar Pradesh Pin - 201301, India.</p>
                                                                  </td>
                                                                  <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                     <p> Call Center </p>
                                                                  <p>+91 9315823047</p>
                                                                  
                                                                  </td>
                                                                  <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                     <p> Contact Email </p>
                                                                   <p> <a href="mailto:info@idhikaholidays.com" target="_blank">info@idhikaholidays.com</a></p>
                                                                  </td>
                                                              </tr>
                                                          </tbody></table>
                                                      </td>
                                                  </tr>
                                              </tbody></table><div class="yj6qo"></div><div class="adL">
                                             
                                          </div></div>`
    }

    try {

        await transport.sendMail(config);
        return true;

    } catch (error) {

        console.log(error);
        return false;
    }

}


export async function POST(request) {
    const { email } = await request.json();
    const newslettermodel = await newsletterModel();
    if (!newslettermodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }

    const existedEmail = await newslettermodel.findOne({ where: { email} });
    if (existedEmail) {

        if (existedEmail.status) {
           
            return NextResponse.json({ status: false, message: "already subscribed!" });
        }

       
    }

    const response = await sendMail(email);
    if (!response) {
        return NextResponse.json({ status: false, message: "Please send again!" });
    }

    try {


        if (existedEmail) {

            return NextResponse.json({ status: true, message: "successfully sent!" });

        }
        else{

            await newslettermodel.create({
                
                email
               
            })
    
            return NextResponse.json({ status: true, message: "successfully sent!" });
        }
        

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }

   
}

export async function GET(request) {
    const input = new URL(request.url).searchParams;
    const email = input.get('email');
    const newslettermodel = await newsletterModel();
    if (newslettermodel) {

        try {

            await newslettermodel.update({
                status: true
            },{where:{email}})
            return NextResponse.json({ status: true, message: "successfully subscribed!" });

        } catch (error) {

            console.log(error);
            return NextResponse.json({ status: false, message: "some error occured!" });

        }

    }

    return NextResponse.json({ status: false, message: "database error occured!" });

}

