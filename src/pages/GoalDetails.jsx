import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function GoalDetails() {
  const [goal, setGoal] = useState(null);

  const { id } = useParams();
  //this function retrieves the project from the API
  const getGoal = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/goals/${id}`);

      setGoal(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGoal();
    //If we were able to go from one details view straight to another we should pass id on the dependency array, so that everytime the component rerenders we get the information from the correct/latest id
  }, []);

  return (
    <div className="GoalDetails">
      {goal && (
        /* React fragment - doesn't add anything to the html (only its contents) */
        <>
          <h1>{goal.title}</h1>
          <p>{goal.description}</p>
        </>
      )}

      {goal &&
        goal.members.map((members) => (
          <li className="MemberCard card" key={members._id}>
            <h3>{members.name}</h3>
          </li>
        ))}

      <Link to={`/groups/edit/${id}`}>Edit Group</Link>
    </div>
  );
}

export default GoalDetails;
