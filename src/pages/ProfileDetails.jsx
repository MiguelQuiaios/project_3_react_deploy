import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/auth.context';

function ProfileDetails() {
  const [profile, setProfile] = useState({});
  const {user} = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken');

  //this function retrieves the project from the API
  const getProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${user._id}`,{
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      
      setProfile(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    //If we were able to go from one details view straight to another we should pass id on the dependency array, so that everytime the component rerenders we get the information from the correct/latest id
  }, [user]);

  return (
    <div className="ProfileDetails">
      {profile && (
        /* React fragment - doesn't add anything to the html (only its contents) */
        <>
        <img src={profile.img} style={{width: 200}}alt='profile pic'/>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <p>{profile.interests}</p>
        </>
      )}

     

      <Link to={`/profile/${profile._id}`}>Edit Profile</Link>
    </div>
  );
}

export default ProfileDetails;
