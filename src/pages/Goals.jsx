import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddGoal from '../components/AddGoal';

function Goals() {
  //declare the state
  const [goals, setGoals] = useState([]);

  //function to call the API

  const getGoals = async () => {
    try {
      //process.env.REACT_APP_API_URL is referring to lcoalhost 5005 locally but will be the deplpoyed link in the future
      const storedToken = localStorage.getItem('authToken');

      //every route that is protected in  the backend needs to receive the headers object with the authorization token
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/goals`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setGoals(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //We need to call the function in a specific moment
  useEffect(() => {
    getGoals();
  }, [goals]);

  return (
    <div className="GoalsListPage">
      <AddGoal refreshGoals={getGoals} />
      <h1>List of goals:</h1>

      {goals.map((goals) => {
        return (
          <div key={goals._id} className="GoalCard card">
            <Link to={`/goals/${goals._id}`}>
              <h3>{goals.title}</h3>
              <h3>{goals.description}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Goals;