import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';
import logo from '../../assets/animation.gif'


const AvailableMeals = () => {
 const[ mealsfetched , setMealsList]=useState([]);
 const [isLoading , setisLoading] = useState(true); // since the useffect start fetching auto
 const [httpError , setHttpError] = useState(null);

  useEffect(()=>{
    const fetchMeals = async ()=>{
    const response = await  fetch('https://food-order-2-37cc8-default-rtdb.firebaseio.com/Movies.json');
        if(!response.ok){
          throw new Error('Something went wrong');
        }

    const responseData = await response.json();

    let loadedMeals =[] ;
     for ( const key in responseData) {
          loadedMeals.push({
            id : key ,
            name : responseData[key].name,
            description : responseData[key].description,
            price : responseData[key].price
          });
     }
          setMealsList(loadedMeals);
          setisLoading(false);
    };
   
           fetchMeals().catch(error =>{ // to catch error witout the try catch
            setisLoading(false);
            setHttpError(error.message);
           });
       
  },[]);  

    if(httpError){
      return (
        <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
      );
    }

    if(isLoading){
      return(
        <div className={classes.gif}>
              <img src={logo} alt='loading'/>
        </div>
      )
    }

  const mealsList = mealsfetched.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
