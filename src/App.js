import logo from './logo.svg';
import './App.css';

//import the web3 moduel
import {Web3} from "web3"
import { useState } from 'react';

//import the contruct address and the API
const ADDRESS = "0xA17A775C808D8C4d46acaa3Ac976Eb9e8f2cA9bf";
const ABI = [{"inputs":[{"internalType":"uint256","name":"_startingPoint","type":"uint256"},{"internalType":"string","name":"_startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];


function App() {
  const [number, setNumber]= useState("none");
  const [currentMessage, setCurrentMessage]= useState("none");
  const [newMessage, setNewMessage] = useState("");
    //initialise the web3 object
    const web3=new Web3(window.ethereum);

    //initialize the contract ABI and ADDRESS
    const myContract = new web3.eth.Contract(ABI, ADDRESS);

    //reading functions
    //number
    async function getNumber(){
      const result = await myContract.methods.getNumber().call();

      setNumber(result.toString())
    }

    //message
    async function getMessage(){
      const message = await myContract.methods.message().call();
      setCurrentMessage(message);
    }

    //writing functions
    //number
    //increasing the number
    async function increaseNumber() {
      //connecting the account i.e the wallet
      const accountsConnected =  await web3.eth.requestAccounts();

      const tx =await myContract.methods.increaseNumber().send({from: accountsConnected[0]});

      getNumber();
      
    }
    //decreasing the number
    async function decreaseNumber(){
      const accountsPresent = await web3.eth.requestAccounts();

      const transact = await myContract.methods.decreaseNumber().send({from: accountsPresent[0]});

      getNumber();
    }
   

    //message 
    async function updateMessage(){
      const connectedAccounts = await web3.eth.requestAccounts();

      const Transaction = await myContract.methods.setMessage(newMessage).send({from: connectedAccounts[0 ]});

      getMessage();

    
    }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <button onClick={getNumber}>Get number</button>
       <br />
     
       <button onClick={increaseNumber}>Increase Number</button>
       <br />
       <button onClick={decreaseNumber}>Decrease Number</button>
       <br />
       <p>Number: {number}</p>
       <br />
       <button onClick={getMessage}>Get message</button>
       <br />
       <p>Message: {currentMessage}</p>

       <input 
       type="text"
       value = {newMessage}
       onChange={(e) => setNewMessage(e.target.value)}
       placeholder="Enter new Message"

       />
       <br />
       <button onClickv={updateMessage}>Update Message</button>
       <br />

      </header>
    </div>
  );
}

export default App;
