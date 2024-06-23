import React, { useEffect, useState } from "react";
import fetch_test_csv from "../../api/get_test_csv.js";
import BasicTable from "../templates/table/BasicTable.jsx";

function AmazonReviewData() {
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

  return (
    <div>
      <BasicTable data={data} />
    </div>
  );
}

export default AmazonReviewData;
// import React, { useEffect, useState } from "react";
// import fetch_test_csv from "../../api/get_test_csv.js";

// function AmazonReviewData() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch_test_csv();
//         console.log("response", response);
//         setData(JSON.parse(response));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {Array.isArray(data) && data.map((review, index) => (
//         <div key={index}>
//           {Object.entries(review).map(([key, value], innerIndex) => (
//             <p key={innerIndex}><strong>{key}:</strong> {value}</p>
//           ))}
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AmazonReviewData;