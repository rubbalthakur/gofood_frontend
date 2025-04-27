import React, { useEffect, useRef, useState } from 'react'

import { useDispatchCart, useCart } from './ContextReducer'
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  const navigate=useNavigate();
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  // console.log(priceOptions);


  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const handleAddToCart = async () => {
    // await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
    // console.log(data);
    if(!localStorage.getItem('authToken')){
      navigate('/login');
      return;
    }
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food.length !== 0) {
      if (size === food.size) {
        await dispatch({ type: 'UPDATE', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty });
        return;
      }
      else if (food.size !== size) {
        await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
        return;
      }
    }
    await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem", 'maxHeight': '360px' }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>

            <div className='container w-100'>
              <select className="m-2  h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })}
              </select>

              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline">₹{finalPrice}/-</div>
            </div>
            <hr />
            <div className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</div>
          </div>
        </div>
      </div>
    </div>
  )
}
