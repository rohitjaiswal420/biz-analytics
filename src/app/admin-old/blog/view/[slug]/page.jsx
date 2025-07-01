

import Blogupdate from '@/component/Blogupdate.jsx'
export default async function Page({ params }) {

    const { slug } = params;

    let blogData = {};
    let Categorylist = [];
    let Metadescriptions;
    let Blogstatus1;
    let Blogstatus;
    let description;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/singleBlog`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ blogUrl: `/${slug}` })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            blogData = (res.blogdetail);
            description = (res.blogdetail.blogDescription);

            if (res.blogdetail.blogStatus) {
                Blogstatus = ('active')
                Blogstatus1 = ('active')
            }
            else {
                Blogstatus = ('inactive')
                Blogstatus1 = ('inactive')
            }
            Metadescriptions = (res.blogdetail.metaDescriptions);
            Categorylist = (res.category);
        }


    } catch (error) {
        console.log("fetching failed", error);
    }


    return (
        <>
            {
                blogData &&
                <Blogupdate blogdata={blogData} blogDescription={description} Blogstatus={Blogstatus} Blogstatus1={Blogstatus1} Categorylist={Categorylist} Metadescriptions={Metadescriptions} />
            }
        </>
    )
}
