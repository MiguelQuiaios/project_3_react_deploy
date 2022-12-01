import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/auth.context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


function ProfileDetails() {
  const {user} = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken');
  const [name, setName] = useState('')
  const [interests, setInterests] = useState('')
  const [img, setImg] = useState('')

  const navigate = useNavigate();

  //this function retrieves the project from the API
  const getProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${user._id}`,{
        headers: { Authorization: `Bearer ${storedToken}` },
      });
setName(response.data.name)
setImg(response.data.img)
setInterests(response.data.interests)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);


const handleSubmit = async (e)=>{
  try {
    e.preventDefault()
    const body = {name, interests, img}
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/editprofile/${user._id}`, body, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    console.log(response.data)
    navigate(`/profile`);
  } catch (error) {
    
  }
}


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Profile Image:</Form.Label>
        <Form.Control type="text" value={img} onChange={(e)=> setImg(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Interests:</Form.Label>
        <Form.Control type="text"  value={interests} onChange={(e)=> setInterests(e.target.value)}/>
      </Form.Group>



      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ProfileDetails;
