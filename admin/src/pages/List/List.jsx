import React, { useEffect, useState } from 'react'
import './List.css'
import axois from "axios"
import {toast} from "react-toastify"

const List = ({url}) => {

  const [list,setList] = useState([]);

  const fetchList = async () => {
    const response = await axois.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data)
    }
    else{
      toast.error("No Item exists")
    }
  }

  const removeFood = async(foodId) =>{
    const response = await axois.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else{
      toast.error("Unable to remove")
    }
  }

useEffect(()=>{
  fetchList();
},[])

  return (
    <div className='list add flex-col'>
      <h2 className='listsTitle'>Food Lists</h2>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Remove</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/uploads/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price} ETB</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List

