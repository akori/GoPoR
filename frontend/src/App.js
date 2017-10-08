import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }


class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      email: null,
    };
  }
  render() {
    return (
      <div>
        <th>{this.state.firstname}</th>
        <th>{this.state.lastname}</th>
        <th>{this.state.email}</th>
      </div>
    );
  }
}

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: Array(9).fill(null),
    };
  }

  renderContact() {
    const props = {firstname: 'Ben', lastname: 'Hector', email: 'test'};
    return (
      <tr>
        <Contact {...props}

        />
      </tr>
    );
  }

  render() {
    return (
      <div>
        <tr>
          <div className="contact-header">
            <th>Firstname</th>
            <th>Lastname</th>
            <th>eMail</th>
          </div>
          <div className="contact-row">
            {this.renderContact()}
          </div>
        </tr>
      </div>
    );
  }
}

class ContactsApp extends React.Component {
  render() {
    return (
      <div className="contactsapp">
        <div className="contacslist">
          <ContactList />
        </div>
      </div>
    );
  }
}

export default ContactsApp;