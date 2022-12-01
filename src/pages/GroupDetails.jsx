import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


function GroupDetails() {
  const [group, setGroup] = useState(null);
  const [content, setContent] = useState('');
  const [showGoals, setShowGoals] = useState(false)
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/message/${id}`, {content}, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setContent('')
      getGroup()


      
    } catch (error) {
      console.log(error)
      
    }
  }
  const handleContent = (e)=> setContent(e.target.value)
  const handleShowGoals = (e) => setShowGoals(!showGoals)

  

  const { id } = useParams();
  //this function retrieves the project from the API
  const getGroup = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/groups/${id}`);

      setGroup(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroup();
    //If we were able to go from one details view straight to another we should pass id on the dependency array, so that everytime the component rerenders we get the information from the correct/latest id
  }, []);

  return (
    <div className="GroupDetails">
      {group && (
        /* React fragment - doesn't add anything to the html (only its contents) */
        <>
          <h1>{group.title}</h1>
          <p>{group.description}</p>
          <Link to={`/goals/${group._id}`}>Add Goals</Link>
        </>
      )}
    <hr />
    
    <button onClick={handleShowGoals}>{showGoals ? 'Hide' : 'Show'}</button>
    <div className="card-collection scroll-box">
    <h4>Goals:</h4>
    {(group && showGoals) &&
        group.goals.map((goal) => (
          <li className="MemberCard card" key={goal._id}>
            <p>{goal.title}</p>
            <p>{goal.description}</p>
          </li>
        ))}
        </div>
           <hr />
      <div className="card-collection">
        <h4>Members:</h4>
          {group &&
            group.members.map((member) => (
              <li className="MemberCard card" key={member._id}>
                <h3>{member.name}</h3>
              </li>
          ))}
      </div>
   
   <hr />
    <h4>Chat:</h4>
    <form onSubmit={handleSubmit}>

<textarea name="content" value={content} cols="10" rows="10" onChange={handleContent}></textarea>
<button type="submit">Send Message</button>
</form>
      {group &&
        group.chat.map((message) => (
          <li className="MemberCard card" key={message._id}>
            <p>{message.sender.name}</p>
            <p>{message.content}</p>
          </li>
        ))}


      <Link to={`/groups/edit/${id}`}>Edit Group</Link>
    </div>
  );
}

export default GroupDetails;
