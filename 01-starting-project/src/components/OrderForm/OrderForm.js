import React from 'react'
import classes from './OrderForm.module.css'

const OrderForm = () => {
  return (
    <div className={classes.container}>
            <form className={classes.form}>
                        <label htmlFor='fullName'>FULL NAME :</label>
                        <input type='text' id='fullName'/>
                        <label htmlFor='email'>EMAIL :</label>
                        <input type='email' id='email' />
                        <label htmlFor='address'>ADDRESS :</label>
                        <input type='text'  id='address'/>
                        <label htmlFor='number'> Phone Number :</label>
                        <input type='text'  id='number'/>
                        <button type='submit' className={classes.buttonform}>BUY</button>
            </form>
    </div>
  )
}

export default OrderForm