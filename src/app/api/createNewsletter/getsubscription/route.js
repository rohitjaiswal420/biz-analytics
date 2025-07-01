import { NextResponse } from 'next/server'
import { newsletterModel } from "../../../models/newsletter.model";
import { Op } from 'sequelize';

export async function GET(request) {

    const input = new URL(request.url).searchParams;
    const name = input.get('name');
    const page = parseInt(input.get('page'));

    const newslettermodel = await newsletterModel();
    if (!newslettermodel) {

        return NextResponse.json({ status: false, message: "database error occured!" });

    }

    try {

        const { rows, count } = await newslettermodel.findAndCountAll({

            limit: 10,
            offset: (page - 1) * 10,
            where: {

                [Op.or]: [{ email: { [Op.iLike]: `%${name}%` } }]
            },
            order: [['date', 'DESC']]

        })

       
        return NextResponse.json({status:true,subscribelist:rows,totalItems:count});

    } catch (error) {

        console.log(error);
        return NextResponse.json({ status: false, message: "some error occured!" });

    }



}
