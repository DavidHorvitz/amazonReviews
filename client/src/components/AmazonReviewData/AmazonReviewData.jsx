import React, { useEffect, useState } from "react";
import fetch_test_csv from "../../api/get_test_csv.js";
import BasicTable from "../templates/table/BasicTable.jsx";

function AmazonReviewData({ reviewData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch_test_csv();
                console.log("response", response);
                setData(JSON.parse(response));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
