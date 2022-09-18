import React, { useContext, useState } from 'react';
import gif from '../../assets/submitting.gif'
import gif2 from '../../assets/success.gif'
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [didSubmit , setDidsubmit] = useState(false) // to show a Done Message
  const [orderclicked,setOrderClicked] = useState(false);

    const orderClickHandler = () =>{
        setOrderClicked(true);
    }
      
    const submitOrderHandler = async (userData) =>{
      setIsSubmitting(true); // to add a little UX loader
       await fetch('https://food-order-2-37cc8-default-rtdb.firebaseio.com/orders.json' , {
        method : 'POST' ,
        body : JSON.stringify({
          user : userData ,
          orderedItems : cartCtx.items
        })
      });
      setIsSubmitting(false);
      setDidsubmit(true);
      cartCtx.clearCart();
    };






  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );


          const modalActions = <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && <button  onClick={orderClickHandler} className={classes.button}>Order</button>}
  
          
        </div> ;


        const cartModalcontent = 
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
              <span>Total Amount</span>
          <span>{totalAmount}</span>
            </div>
  
             { orderclicked && 
             <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
            }
              { !orderclicked && modalActions }
        </React.Fragment> ;

        const isSubmittingModalcontent =  <img src={gif} alt='loading ... ' /> ;

        const didSubmitModalContent = <p>DONE :)</p>
  


  return (
    <Modal onClose={props.onClose}>
        
    { !isSubmitting  && !didSubmit && cartModalcontent}
    {isSubmitting && isSubmittingModalcontent}
    { !isSubmitting &&  didSubmit && didSubmitModalContent}

     
    </Modal>
  );
};

export default Cart;
