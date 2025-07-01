"use server"
import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'
import { inquiryModel } from '../../models/inquiry.model'


const transport = nodemailer.createTransport({

  service: 'gmail',
  auth: {

    user: "rohitkumarchau656@gmail.com",
    pass: "pihc knoi rbca lrif"

  }
})



const sendMail = async (name, email, number, inquiries) => {

  const config = {

    from: {name:"biz analytics",address:'biz@bizanalyticsystems.com'},
    to: email,
    subject: "welcome from biz analytics",
    html: `<div style="/* justify-content: center; */font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;max-width:600px;display:block;margin:0 auto;padding:20px;/* display: flex; *//* align-items: center; */"><div class="adM">
                                            </div><table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;border-radius:3px;margin:0;border:none">
                                                <tbody><tr style="font-family:'Roboto',sans-serif;font-size:14px;margin:0">
                                                    <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;color:#495057;font-size:14px;vertical-align:top;margin:0;padding:30px;border-radius:7px;background-color:#fff" valign="top">
                                                        
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                            <tbody><tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;width: 100%;">
                                                                <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
                                                                    <div style="text-align:center;margin-bottom:15px">
                                                                        <img src="https://bizanalyticsystems.com/assets/images/logo.png" alt="" height="100" width="100" class="CToWUd" data-bit="iit">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;line-height:1.5;font-size:24px;vertical-align:top;margin:0;padding:0 0 10px;text-align:center;font-weight:500" valign="top">
                                                                    Thankyou for your inquiry 
                                                                </td>
                                                            </tr>
                                                            <tr style="align-items: center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;display: flex;/* align-content: center; */">
                                                                <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:center" valign="top">
                                                                   biz analytics is being with a vision to create a Build tailored AI solutions for unique business challenges Develop comprehensive AI strategies aligned with business objectives


                                                                </td>
                                                            </tr>
                                                           

                                                            <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;border-top:1px solid #e9ebec;display: flex;">
                                                                <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                   <p> Our Headquarter </p>
                                           <p>70,Edgewood Ln, Glastonbury, CT 06033, United States of America</p>
                                                                </td>
                                                                <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                   <p> Call Center </p>
                                                                <p>+1-201-681-3725</p>
                                                                
                                                                </td>
                                                                <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                   <p> Contact Email </p>
                                                                 <p> <a href="mailto:biz@bizanalyticsystems.com" target="_blank">biz@bizanalyticsystems.com</a></p>
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



const sendMailtoReciever = async (name, email, number, country, inquiries) => {

  const config = {

    from: email,
    to: 'r8383922@gmail.com',
    subject: `inquiry from ${name}`,
    html: `<div style="/* justify-content: center; */font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;max-width:600px;display:block;margin:0 auto;padding:20px;/* display: flex; *//* align-items: center; */"><div class="adM">
                                            </div><table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;border-radius:3px;margin:0;border:none">
                                                <tbody><tr style="font-family:'Roboto',sans-serif;font-size:14px;margin:0">
                                                    <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;color:#495057;font-size:14px;vertical-align:top;margin:0;padding:30px;border-radius:7px;background-color:#fff" valign="top">
                                                        
                                                        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                            <tbody><tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;width: 100%;">
                                                                <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0 0 20px" valign="top">
                                                                    <div style="text-align:center;margin-bottom:15px">
                                                                        <img src="	https://bizanalyticsystems.com/assets/images/logo.png" alt="" height="100" width="100" class="CToWUd" data-bit="iit">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                <td style="font-family:'Roboto',sans-serif;box-sizing:border-box;line-height:1.5;font-size:24px;vertical-align:top;margin:0;padding:0 0 10px;text-align:center;font-weight:500" valign="top">
                                                                   Inquiry From ${name.charAt(0).toUpperCase() + name.slice(1, name.length)}
                                                                </td>
                                                            </tr>
                                                            <tr style="align-items: center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;display: flex;/* align-content: center; */">
                                                                <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left" valign="top">
                                                                  
                                                                  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                    <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                    <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left; white-space: nowrap;" valign="top">Name :</td>  
                                                                    <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left" valign="top">
                                                                        ${name}
                                                                      </td>
                                                                    </tr>
                                                                    <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                     <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left; white-space: nowrap;" valign="top">Phone Number :</td>  
                                                                      <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left" valign="top">
                                                                      ${number}
                                                                      </td>
                                                                    </tr>
                                                                    <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                    <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left; white-space: nowrap;" valign="top">Email :</td>  
                                                                      <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left" valign="top">
                                                                      ${email}
                                                                      </td>
                                                                    </tr>
                                                                    <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0">
                                                                    <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left; white-space: nowrap;" valign="top">Message :</td>  
                                                                      <td style="font-family:'Roboto',sans-serif;color:#878a99;line-height:1.5;box-sizing:border-box;font-size:15px;vertical-align:top;margin:0;padding:0 0 24px;text-align:left" valign="top">
                                                                      ${inquiries}
                                                                      </td>
                                                                    </tr>
                                                                  </table>

                                                                </td>
                                                            </tr>
                                                           

                                                            <tr style="font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;margin:0;border-top:1px solid #e9ebec;display: flex;">
                                                                <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                   <p> Our Headquarter </p>
                                           <p>70,Edgewood Ln, Glastonbury, CT 06033, United States of America</p>
                                                                </td>
                                                                <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                   <p> Call Center </p>
                                                                <p>+1-201-681-3725</p>
                                                                
                                                                </td>
                                                                <td style="color:#878a99;text-align:center;font-family:'Roboto',sans-serif;box-sizing:border-box;font-size:14px;vertical-align:top;margin:0;padding:0;padding-top:15px" valign="top">
                                                                   <p> Contact Email </p>
                                                                 <p> <a href="mailto:biz@bizanalyticsystems.com" target="_blank">biz@bizanalyticsystems.com</a></p>
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
  const { name, email, number, inquiries, country } = await request.json();
  const response = await sendMail(name, email, number, inquiries);
  const response1 = await sendMailtoReciever(name, email, number, country, inquiries);
  const inquirymodel = await inquiryModel();


  if (!response) {
    return NextResponse.json({ status: 0, message: "Please send again!" });
  }

  if (!response1) {
    return NextResponse.json({ status: 0, message: "Please send again!" });
  }


  if (!inquirymodel) {
    return NextResponse.json({ status: false, message: "database error occured!" });
  }

  try {

    await inquirymodel.create({
      fullName: name, message: inquiries, email, phoneNumber: number
    })
    return NextResponse.json({ status: true, message: "successfully sent!" });

  } catch (error) {

    console.log(error);
    return NextResponse.json({ status: false, message: "some error occured!" });

  }






}