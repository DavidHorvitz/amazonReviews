import React, { useEffect, useState } from "react";
import BasicTable from "../templates/table/BasicTable.jsx";

function AmazonReviewData({ reviewData }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(reviewData);
    }, [reviewData]);

    return (
        <div>
            <BasicTable data={data} />
        </div>
    );
}
export default AmazonReviewData;
