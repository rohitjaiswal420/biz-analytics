
import PageUpdate from "../../../../../component/PageUpdate.jsx";
export default async function Page({ params }) {

    const { slug } = await params;
    let pageDetail = {};

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
        }


    } catch (error) {

        console.log("fetching failed", error);


    }


    return (

       <PageUpdate pageDetail={pageDetail}/>
    )
}
