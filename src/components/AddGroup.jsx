import { useState } from 'react';
import axios from 'axios';

function AddGroups(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/groups`, { title, description });

      //clear the inputs
      setTitle('');
      setDescription('');

      //refresh the list
      props.refreshProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div className="AddGroup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          cols="30"
          rows="10"
          onChange={handleDescription}
        ></textarea>

        <button type="submit">Add Group</button>
      </form>
    </div>
  );
}

export default AddGroups;