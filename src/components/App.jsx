import React, { useState, useEffect } from "react";
import AddContactForm from "./AddContactForm/AddContactForm";
import ContactList from "./ContactList/ContactList";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const addNewContact = (newContact) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isDuplicate) {
      alert(`Contact with name ${newContact.name} already exists!`);
    } else {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.currentTarget.value);
  };

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <AddContactForm onAddNewContact={addNewContact} />
      <ContactList
        contacts={filteredContacts}
        onFilterChange={handleFilterChange}
        filter={filter}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
