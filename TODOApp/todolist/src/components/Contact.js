import React from 'react';
import Contactcard from "./Contactcards";

const Contact = (props) => {
    console.log(props);

    const deleteContactHandler = (id) => {
        props.getContactid(id);
    };

    const renderContact = props.contacts.map((contact) => {
        return <Contactcard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />
    
    }); 
    return (
        <div className="ui called list">
                {renderContact}
        </div>
    ); 
    
}
export default Contact;