import React, { useState } from "react";
import { nanoid } from 'nanoid';
import { Button } from "./AddContactForm.styled";

const AddContactForm = ({ onAddNewContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.currentTarget.value);
  };

  const handleNumberChange = event => {
    const number = event.currentTarget.value.replace(/\D/g, '');
    setNumber(number);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name: name,
      number: number
    };
    onAddNewContact(newContact);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="number">
        Number
        <input
          type="text"
          name="number"
          value={number}
          onChange={handleNumberChange}
        />
      </label>
      <Button type="submit">Add Contact</Button>
    </form>
  );
};

export default AddContactForm;
