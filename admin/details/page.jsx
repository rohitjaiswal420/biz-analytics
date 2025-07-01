import DetailPage from "../../../component/DetailPage";
export default async function Page() {



    let Details = {};

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/details`, {
            cache: "no-store",
            method: 'GET'
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const response = await res.json();
        if (response.status) {
            Details = response.details;
            
        }

    } catch (error) {
        console.error("Fetch error:", error);
    }


    return (
     <DetailPage Details={Details}/>
    )
}
