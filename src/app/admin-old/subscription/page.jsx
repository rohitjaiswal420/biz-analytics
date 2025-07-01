import React from 'react'
import Subscription from '@/component/Subscription.jsx'
export default async function Page() {

    let subscribeList = [];
    let totalItems;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/createNewsletter/getsubscription?page=1&name=`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            subscribeList = res.subscribelist;
            totalItems= Math.ceil(res.totalItems/10)
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

    return (
        <>
            {
                subscribeList && <Subscription subscribeList={subscribeList} totalItems={totalItems}/>
            }
        </>
    )
}
