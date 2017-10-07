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
    };
  }
  render() {
    return (
      <li>{this.props.firstname}</li>
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

  renderContact(i) {
    return (
      <Contact firstname={i}

      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="contact-row">
          {this.renderContact("Ignacio")}
        </div>
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