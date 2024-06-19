import {useState} from 'react'
import axios from 'axios'
const AddShop = () => {
  const [shopNo,setShopNo]=useState('')
  const [amount,setAmount]=useState('')
  const handleAmountChange=(e)=>{
setAmount(e.target.value)
  }
  const handleShopChange=(e)=>{
    setShopNo(e.target.value)
  }
  const obj={
    shopNo,
    leaseAmount:amount
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8000/properties",obj)
    .then((response)=>{
      console.log(response.data)
      alert(response.data.message)
    })
    .catch((error)=>{
      alert(error.response.data.error)
    })
  }

    return (
      <div>
        <form>
          <input type="text" placeholder="Shop No" onChange={handleShopChange} value={shopNo}></input>
          <input type="text" placeholder="Lease Amount Per year"value={amount} onChange={handleAmountChange}></input>
          <button onClick={handleSubmit} disabled={(shopNo.trim().length>0) && (amount.trim().length>0)?false:true}>Submit</button>
        </form>
      </div>
    );
  };

  export default AddShop;