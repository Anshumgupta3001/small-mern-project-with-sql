import React, { useState } from 'react';
import FormList from './formlist';

function Form() {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [entries, setEntries] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Data saved successfully.') {
          setEntries([...entries, formData]);
          setFormData({ name: '', age: '' });
        } else {
          console.error('Error saving data:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <FormList entries={entries} />
    </div>
  );
}

export default Form;
