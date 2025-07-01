
import ServicePageUpdate from "../../../../../component/ServicePageUpdate.jsx";
export default async function Page({ params }) {

    const { slug } = await params;
    let pageDetail = {};
    let Blogstatus1;
    let Blogstatus;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createPage/pageByid`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ pageId: slug })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            pageDetail = res.pagedetail;
            if (res.pagedetail.status) {
                Blogstatus = ('active')
                Blogstatus1 = ('active')
            }
            else {
                Blogstatus = ('inactive')
                Blogstatus1 = ('inactive')
            }
        }


    } catch (error) {

        console.log("fetching failed", error);


    }


    return (

       <ServicePageUpdate pageDetail={pageDetail} Blogstatus={Blogstatus} Blogstatus1={Blogstatus1}/>
    )
}
