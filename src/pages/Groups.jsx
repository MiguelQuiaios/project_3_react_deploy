import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddGroup from '../components/AddGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Groups() {
  //declare the state
  const [groups, setGroups] = useState([]);

  //function to call the API

  const getGroups = async () => {
    try {
      //process.env.REACT_APP_API_URL is referring to lcoalhost 5005 locally but will be the deplpoyed link in the future
      const storedToken = localStorage.getItem('authToken');

      //every route that is protected in  the backend needs to receive the headers object with the authorization token
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/groups`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setGroups(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //We need to call the function in a specific moment
  useEffect(() => {
    getGroups();
  }, [groups]);

  return (
   <>    
   <div>
    <h1>Add group</h1>
       <AddGroup refreshGroups={getGroups} />
   {groups.map((group) => {
      return (
    <Card className="text-center">
            <Card.Header>Group</Card.Header>
      <Card.Body>
        <Card.Title>{group.title}</Card.Title>
        <Card.Text>
        {group.description}
        </Card.Text>
        <Link to={`/groups/${group._id}`}>
        <Button variant="primary">Enter Group</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">{group.createdAt.slice(0,10)}</Card.Footer>
    </Card>
    );
  })}
</div>
</>

  );
}

export default Groups;