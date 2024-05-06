import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {BackendService} from '@genezio-sdk/TroutAreaV2';
//import "./styles.css";
//import { useNavigate } from 'react-router-dom';

//import { BackendService } from "@genezio-sdk/TroutArea";
import './App.css'

function App({}) { //setFormData
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [NrSector, setSector] = useState('');
  const [NumePrenume, setNumePrenume] = useState('');
  const [CodSecret, setCodSecret] = useState('');
  const [tempCode, setTempCode] = useState('');
  const [inregistratValue,setInregistratValue] = useState('');

  
    const fetchData = async () => {
      try {
        //const BackendService24 = new BackendService();
        const response = await BackendService.getCode(NrSector); // Replace with the actual name
        //const codPrivattt = response.rows[0].cod_privat;
        //console.log(codPrivattt);

        const jsonObject = JSON.parse(response);
        console.log("THE RESPONSEEEE:", response);
        // Access the cod_privat value
        const codSecretValue = jsonObject.rows[0].cod_privat;
        const inregistratBool = jsonObject.rows[0].inregistrat;
        

        return {codSecretValue,inregistratBool};
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      //return response;
    };

    const registerParticipant = async () => {
      try{
        const sendd = await BackendService.addParticipant(NumePrenume,NrSector,CodSecret);
        console.log(sendd);
      }catch(error){
        alert(`Error! ${error.message}`);
      }
    };
    useEffect(() => {
      const fetchCode = async () => {
        const comboResult = await fetchData();
        const codSecretValuee = comboResult.codSecretValue.toString();
        console.log(typeof codSecretValuee);
        setTempCode(codSecretValuee);
        const inregistratt = comboResult.inregistratBool;
        setInregistratValue(inregistratt);
        console.log("Value of cod_privat:", codSecretValuee);
        console.log("Value of inregistrat:", inregistratt);
      };
      fetchCode();
    }, [NrSector]);

    
  

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log("rere");
    

    console.log(inregistratValue == 'false');
    console.log(typeof inregistratValue);
    console.log(tempCode == CodSecret);
    if(tempCode == CodSecret && inregistratValue == false){
      setLoginLoading(true);
      registerParticipant();

      localStorage.removeItem('storedStand');
      localStorage.removeItem('storedNume');
      localStorage.setItem('storedStand', NrSector);
      localStorage.setItem('storedNume', NumePrenume);

      // Simulate an API call or any asynchronous operation
      setTimeout(() => {
        
        setLoginLoading(false);
        //setFormData({NrSector, NumePrenume, CodSecret});
        //PostgresService.insertUser(NumePrenume)
        // Redirect to the "/conectat" route with form data as state
        navigate('/con');
      }, 2000); // Simulating loading for 2 seconds
    }
    else{
      alert("Combinatia cod secret-nr sector incorecta");
      setSector('');
      setNumePrenume('');
      setCodSecret('');
    };


  }
  return (
      <>
      <div className="container-mare">
        <div className='container-nume'>
          <div className='nume-concurs'>
            <p1 className='nume1'>Cupa<br></br> "Trout in the Dark"</p1>
              <br></br>
              <p2 className='nume2'>Editia a II-a</p2>
          </div>
        </div>

        <div className="login-box">
          <form onSubmit={handleLoginSubmit}>
            <div className='nrsector-input'>
              <label htmlFor="nrsector">Nr. sector:</label>
              <input
                type="nrsector"
                id="nrsector"
                value={NrSector}
                onChange={(e) => setSector(e.target.value)}
                required
              />
            </div>
            <div className='numeprenume-input'>
              <label htmlFor="numeprenume">Nume si Prenume:</label>
              <input
                type="numeprenume"
                id="numeprenume"
                value={NumePrenume}
                onChange={(e) => setNumePrenume(e.target.value)}
                required
              />
            </div>
            <div className='password-input'>
              <label htmlFor="password">Cod secret:</label>
              <input
                type="codsecret"
                id="codsecret"
                value={CodSecret}
                onChange={(e) => setCodSecret(e.target.value)}
                required
              />
            </div>
            <button type="submit">{ loginLoading ? "Se activeaza" : "Activare cont" } </button>
          </form>
        </div>
      </div>
       </>
    
  );
}

export default App
