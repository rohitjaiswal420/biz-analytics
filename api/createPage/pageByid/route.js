
import { pageModel } from '../../../models/pages.model'
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    const { pageId} = await request.json();
    const pagemodel = await pageModel();

    if (!pagemodel) {
        return NextResponse.json({ status: false, message: "database error occured!" });
    }



    try {

        const pagedetail = await pagemodel.findOne({ where: { pageId} });
        return NextResponse.json({ status: true, pagedetail});

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });
    }
}