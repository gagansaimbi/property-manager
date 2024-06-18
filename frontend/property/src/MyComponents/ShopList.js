import React, { useState, useEffect } from "react";
// import ShopDetails from "./Shop.json";
import axios from 'axios';

const ShopList = () => {
    const [details, setDetails] = useState([]);
    const [name, setName] = useState();
    const [records, setRecords] = useState([])
    useEffect(() => {
        getData();

    }, []);

    async function getData(){
        const response = await axios.get('http://localhost:3000/properties')
        console.log(response.data)
        setDetails(response.data);
        setRecords(response.data);
    }

    const handleSort = async (e) => {
        const val = e.target.name;
        if (val === "ascending") {
            // const sorted = [...details].sort((a, b) => a.leaseAmount - b.leaseAmount);
            const response = await axios.get(`http://localhost:3000/properties?leaseAmount=asc${name && name!=='' ? `&tenantName=${name}`:``}`)
            console.log("sorted", response.data);
            setRecords(response.data)
        }
        if (val === "descending") {
            const response = await axios.get(`http://localhost:3000/properties?leaseAmount=desc${name && name!=='' ? `&tenantName=${name}`:``}`)
            // const sorted = [...details].sort((a, b) => b.leaseAmount - a.leaseAmount);
            console.log("sorted", response.data);
            setRecords(response.data)
        }
    };
    const filter = async (event) => {
        if (event.key === "Enter"){
            // setRecords(details.filter(f => f.tenantName.toLowerCase().includes(event.target.value)))
        const response = await axios.get(`http://localhost:3000/properties?tenantName=${event.target.value}`)
        setRecords(response.data)
        }

    }
    return (
        <div>
            <table>
                <tr>
                    <th>Shop Details</th>
                    <th>
                        Lease Amount{" "}
                        <button name="ascending" onClick={(e) => handleSort(e)}>
                            ↑
                        </button>{" "}
                        <button name="descending" onClick={(e) => handleSort(e)}>
                            {" "}
                            ↓
                        </button>
                    </th>
                    <th>Status</th>
                    <div><th>Tenant Name</th>
                        <input type="text" onKeyDown={filter} onChange={e=>setName(e.target.value)}></input></div>

                    <th>Tenant Mobile</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                {records.map((data) => (
                    <tr>
                        <td>{data.shopDetails}</td>
                        <td>{data.leaseAmount}</td>
                        <td>{data.status}</td>
                        <td>{data.tenantName}</td>
                        <td>{data.tenantMobile}</td>
                        <td>{data.startDate}</td>
                        <td>{data.endDate}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};
export default ShopList;