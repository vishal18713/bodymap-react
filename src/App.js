
import { compiledContract } from '../../BodyMap-server/compile';
import './App.css';
import React, { useState } from 'react';
const Web3 = require('web3');
window.ethereum.request({method:'eth_requestAccounts'});
const web3 = new Web3(window.ethereum);
const fetch = require('node-fetch');

function App() {
  const [passwordClearText,setPasswordClearText] = useState('');
  const [passwordClearTextBasic,setPasswordClearTextBasic] = useState('');
  const [passwordClearTextTailor,setPasswordClearTextTailor] = useState('');
  const [deployedContract,setDeployedContract] = useState('');
  const [deployedAddress,setDeployedAddress] = useState('');

  const handelpasswordClearTextChanged = (event) =>{
    setPasswordClearText(event.target.value);
  }
  const handelpasswordClearTextBasicChanged = (event) =>{
    setPasswordClearTextBasic(event.target.value);
  }
  const handelpasswordClearTextTailorChanged = (event) =>{
    setPasswordClearTextTailor(event.target.value);
  }

  const [bodyMapBasic,setBodyMapBasic] = useState({
    Height:'',Weight:''
  });
  const [bodyMapTailor,setBodyMapTailor] = useState({
     Waist:'',Legs:'',Arms:'',Posture:''
  });

  const handleBodyMapBasicChange = (e,key) =>{
    setBodyMapBasic({...bodyMapBasic,[key]:e.target.value});
  }
  const handleBodyMapTailorChange = (e,key) =>{
    setBodyMapTailor({...bodyMapTailor,[key]:e.target.value});
  }
  async function deployContract(){
    fetch("http://localhost:8000").then((response) => response.json()).then(async (compiledContract) =>{});
    const accounts = await web3.eth.getAccounts();
    let contract = await new web3.eth.Contract(compiledContract.abi)
    .deploy({data:compiledContract.evm.bytcode.object,arguments:[passwordClearText]})
    .send({from:accounts[0],gas:'1000000'});
    setDeployedContract(contract);
    setDeployedAddress(contract.option.address);
  }
  


  
  return (
    <div className="App">
      <h1>Globomatics BodyMap</h1>
      <h3>contract address:{deployedAddress}</h3>
      <div>
        <label>contract password</label>
        <inpute type="text" onChange={handelpasswordClearTextChanged} ></inpute>
        <button onClick={deployContract}>deploy contract</button>
      </div>
      
    </div>
  );
}

export default App;
