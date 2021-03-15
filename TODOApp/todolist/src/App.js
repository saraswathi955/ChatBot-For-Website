import React, { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import api from './api/contacts'; 
import axios from "axios/index";
// import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';


// import Header from "./Header";
import Header from "./components/Header"
import Addinformation from "./components/Addinformation";
import Contact from "./components/Contact";


function App() {

  const url = 'http://localhost:3006';

  // const LOCAL_STORAGE_KEY = "contacts";
  console.log('step1...')
  console.log(api)

  const [contacts, setContacts] = useState([]);

  // const retriveContacts = async () => {
  //   console.log('step2...')
  //   const response = await api.get("/contacts");
  //   console.log(response)
  //   return response.data; 

  // }
  const retriveContacts = () => {
    axios.get(`${url}contacts`)
    .then((response) =>{
      const allconstacts = response.data
    })
    .catch(error => console.error(`Error: ${error}`));
  }
  

  const addContactHandler = async(contact) => {
    console.log('step3...')
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact
    }
    // console.log(response);
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
  }


  const removeContactHandler = async (id) => {
    console.log('step4...')
    await api.delete(`/contacts/${id}`);
    const newContact = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContact)
  }
  useEffect(() => {
    console.log('step5...')
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allconstacts = await retriveContacts();
      if(allconstacts) setContacts(allconstacts);
    };
    getAllContacts();

  }, []);

  useEffect(() => {
    console.log('step6...')
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts]);

  // const contacts   = [
  //   {
  //     id:"1",
  //     name:"ramya",
  //     email:"saru@gmail.com",
  //   }, 
  //   {
  //     id:"2",
  //     name:"saaru",
  //     email:"saraswathi@gmail.com",
  //   }
  // ]
  return (
    
    <div className="ui container">
      {/* <BrowserRouter> */}
        <Header />
        <Addinformation addContactHandler={addContactHandler}/>
        <Contact contacts={contacts} getContactId={removeContactHandler}/>
      {/* </BrowserRouter> */}
     
    </div>

  );
}

export default App;
