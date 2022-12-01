import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function AddGoal(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { id } = useParams();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/goals/${id}`, { title, description });

      //clear the inputs
      setTitle('');
      setDescription('');

      //refresh the list
      props.refreshGoals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AddGoal">
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

        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default AddGoal;