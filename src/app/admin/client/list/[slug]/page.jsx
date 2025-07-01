

import ImagesList from '../../../../../component/ImagesList.jsx';
export default async function Page({ params }) {

    const {slug}=await params
    let galleryList = null;
    let totalItems;
    let categoryName;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/imageClient?page=1&id=${slug}&name=`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
        const res = await response.json();

        if (res.status) {
            galleryList = res.clientlist;
            totalItems = Math.ceil(res.totalItems / 10)
            categoryName=res.categoryName
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

    return (
        <>
            {
               galleryList && <ImagesList galleryList={galleryList} totalItems={totalItems} id={slug} categoryName={categoryName}/>
            }
        </>
    )
}
