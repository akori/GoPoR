import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends React.Component {
  render() {
     return (
        <div>
           <h1>Akori's Addressbook</h1>
        </div>
     );
  }
}

class ContactsApp extends React.Component {
  constructor() {
    super();
  
    this.state = {
       data: 
       [
          {
             "id":1,
             "firstname":"Ignacio",
             "lastname":"Vergara",
             "email":"iv@akori.cl"
          },
      
          {
             "id":2,
             "firstname":"Bryan",
             "lastname":"Godefroy",
             "email":"br@akori.cl"
          },
      
          {
             "id":3,
             "firstname":"Francisco",
             "lastname":"Claude",
             "email":"fc@akori.cl"
          }
       ],
       data_string: 'Initial string'
    }

    this.updateState = this.updateState.bind(this);
 }

 updateState(e) {
  this.setState({data_string: e.target.value});
}

 render() {
    return (
       <div>
          <Header/>
          <table>
             <tbody>
                {this.state.data.map((person, i) => <Contact key = {i} 
                   data = {person} />)}
             </tbody>
          </table>
          <Content myDataProp = {this.state.data_string} 
               updateStateProp = {this.updateState}></Content>
       </div>
    );
 }
}

class Contact extends React.Component {
  render() {
     return (
        <tr>
           <td>{this.props.data.id}</td>
           <td>{this.props.data.firstname}</td>
           <td>{this.props.data.lastname}</td>
           <td>{this.props.data.email}</td>
        </tr>
     );
  }
}

class Content extends React.Component {
  
     render() {
        return (
           <div>
              <input type = "text" value = {this.props.myDataProp} 
                 onChange = {this.props.updateStateProp} />
              <h3>{this.props.myDataProp}</h3>
           </div>
        );
     }
  }

export default ContactsApp;