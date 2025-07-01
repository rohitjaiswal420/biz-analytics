import {blogModel} from '../../models/blog.model'
import {inquiryModel} from '../../models/inquiry.model'
import { NextResponse } from 'next/server';
export async function GET(request)
{
    const blogmodel=await blogModel();
    const inquirymodel=await inquiryModel();

   
    try {
        
      const bloglist=await blogmodel.findAndCountAll({

        limit:4,
        order:[['createdAt','DESC']],
        attributes:[
            'blogId','blogTitle','blogStatus','blogImage'
        ]

      })

      const inquirylist=await inquirymodel.findAndCountAll({

        limit:4,
        order:[['createdAt','DESC']],
        attributes:[
            'inquiryId','fullName','phoneNumber'
        ]

      })
      return NextResponse.json({status:true,blogdata:bloglist.rows,totalblogs:bloglist.count,inquirydata:inquirylist.rows,totalinquiries:inquirylist.count})



    } catch (error) {

        return NextResponse.json({status:false,message:"some error occured!"})
        
    }
}

