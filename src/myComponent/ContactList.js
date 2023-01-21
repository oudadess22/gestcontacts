import React, { useState } from 'react';
import Contact from './Contact';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', city: '' });

  const Send = event => {
    event.preventDefault();
    setContacts([...contacts, newContact]);
    setNewContact({ name: '', phone: '', city: '' });
  };

  const Delete = index => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState("name");
  const filteredContacts = contacts
    .filter(contact =>
      contact.city.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let sortCont = 0;
      if (a[sortBy] > b[sortBy]) {
        sortCont = 1;
      } else if (a[sortBy] < b[sortBy]) {
        sortCont = -1;
      }
      return sortCont;
    });

  return (
    <div>
          <h1>Manager contacts</h1>
          <form onSubmit={Send}>
              <table>
                  <tr>
                    <td>
                        <label>Nom :</label>
                    </td>
                    <td>
                        <input type="text" value={newContact.name} onChange={event => setNewContact({ ...newContact, name: event.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <label>Telephone :</label>
                    </td>
                    <td>
                         <input type="text" value={newContact.phone} onChange={event => setNewContact({ ...newContact, phone: event.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                         <label>ville :</label>
                    </td>
                    <td>
                         <input type="text" value={newContact.city} onChange={event =>setNewContact({ ...newContact, city: event.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                         <button type="submit">Ajouter</button>
                    </td>
                  </tr>
              </table>
        </form>
        <form>
              <label>
              Rechercher :
              </label>
              <input type="text" value={search} onChange={event => setSearch(event.target.value)} />

              <label>
              Trier :
              </label>
              <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
                  <option value="name">Nom</option>
                  <option value="city">Ville</option>
              </select>

        </form>
        <table>
              {filteredContacts.map((contact, index) => (
               <tr>
                  <td>
                      <div  key={index}>
                        <Contact index={index} name={contact.name} phone={contact.phone} city={contact.city} onDelete={Delete} />
                        <button onClick={()=>Delete(index)} className='supp'>Supprimer</button>
                      </div>
                  </td>
               </tr>
              ))}
        </table>
    </div>
  );
}

export default ContactList;


