import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() ===''; // helpers
const isNotFiveCharts = value => value.trim().length <5


const Checkout = (props) => {
        const [formInputsValidity, setFormInputsValidity] = useState({
            // multiple states
            name : true ,
            street : true ,
            city : true,
            postalCode : true 
        })
    
        const nameInputRef = useRef();
        const streetInputRef = useRef();
        const postalCodeInputRef = useRef();
        const cityInputRef = useRef();
       

  const confirmHandler = (event) => {
    event.preventDefault();


    const enteredName= nameInputRef.current.value;
    const enteredStreet= streetInputRef.current.value;
    const enteredPostalCode= postalCodeInputRef.current.value;
    const enteredcity= cityInputRef.current.value;


    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredcity);
    const enteredPostalcodeIsValid = !isNotFiveCharts(enteredPostalCode);

    //assigning new value for testing and conditional rendering
    setFormInputsValidity({
        name : enteredNameIsValid ,
        street : enteredStreetIsValid ,
        city : enteredCityIsValid ,
        postalCode : enteredPostalcodeIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalcodeIsValid ;

    // check to submit or show errors 
    if(!formIsValid){
        return;
    }

    // submit data here
    props.onConfirm({
        name : enteredName ,
        street : enteredStreet ,
        city : enteredcity,
        postalCode : enteredPostalCode 
    })
  };

  const nameFormClasses = `${classes.control}  ${formInputsValidity.name ? '' : classes.invalid}`;
  const streetFormClasses = `${classes.control}  ${formInputsValidity.street ? '' : classes.invalid}`;
  const cityFormClasses = `${classes.control}  ${formInputsValidity.city ? '' : classes.invalid}`;
  const postalCodeFormClasses = `${classes.control}  ${formInputsValidity.postalCode ? '' : classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameFormClasses} > 
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>please enter a valid name</p>}
      </div>
      <div className={streetFormClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>please enter a valid street</p>}
      </div>
      <div className={postalCodeFormClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>please enter a valid postal code (+5 characters)</p>}
      </div>
      <div className={cityFormClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;