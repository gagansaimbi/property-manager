import React, { useState, useEffect } from "react";
// import ShopDetails from "./Shop.json";
import axios from 'axios';

const LeaseShop = () => {
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([])
  const [tenantName, setTenantName] = useState('')
  const [tenantMobile, setTenantMobile] = useState('')
  const [leaseDuration, setLeaseDuration] = useState(1)
  const [id, setId] = useState()


  const obj = {
    tenantName,
    tenantMobile,
    leaseDuration
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.patch("http://localhost:8000/properties/"+id, obj)
      .then((response) => {
        console.log(response.data)
        alert(response.data.message)
        getData();
        setTenantMobile('')
        setTenantName('')
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
      
  }


  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await axios.get('http://localhost:8000/properties?occupied=false')
    console.log(response.data)
    // setDetails(response.data);
    setRecords(response.data);
  }

  return (
    <div>
      <table>
        <tr>
          <th>Shop No</th>
          <th>Floor No</th>
          <th>
            Lease Amount
          </th>
          <th>Booking</th>
        </tr>
        {records.map((data) => (
          <tr>
            <td>{data.shopNo}</td>
            <td>{data.floorNo}</td>
            <td>{data.leaseAmount}</td>
            <td><button onClick={() => { setShowForm(true); console.log(data._id); setId(data._id); }}>Book Shop</button></td>
          </tr>
        ))}
      </table>
      <br />
      {showForm &&
        <div>
          <form>
            <input type="text" placeholder="Tenant Name" onChange={e => setTenantName(e.target.value)} value={tenantName}></input>
            <input type="text" placeholder="Tenant Mobile" value={tenantMobile} onChange={e => setTenantMobile(e.target.value)}></input>
            <select onChange={e => setLeaseDuration(e.target.value)}>
              <option default>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <button onClick={handleSubmit} disabled={(tenantName.trim().length > 0) && (tenantMobile.toString().trim().length > 0) ? false : true}>Submit</button>
          </form>
        </div>
      }
    </div>
  );
};
export default LeaseShop;