import React, { useState,useEffect } from 'react';
//import localStorage from 'local'

import './Conectat.css';
import './Modal.css'; // Import CSS file for modal styles
import { BackendService } from '@genezio-sdk/TroutAreaV2';
//import { useLocation } from 'react-router-dom';
//import { HelloWorldClass } from "@genezio-sdk/TroutArea";

function Conectat() { //formData
    //const location = useLocation();
    const nrEtapeNEMOD = 13;
    const nrStanduri = 40;
    const [updatat,setUpdatat] = useState(false);
    const [data, setData] = useState(null);
    const [rows, setRows] = useState([]);
    const [etape, setEtape] = useState(13);
    const [nrMansa, setNrMansa] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
   // const [formMansaData, setFormMansaData] = useState({});
    // nr mansa / sector adversar /capturi proprii / capturi adversar
    // nr puncte / mentuini adversar / cod secret adversar
    const [sectorAdversar, setSectorAdversar] = useState('');
    const [capturiProprii, setCapturiProprii] = useState('');
    const [capturiAdversar, setCapturiAdversar] = useState('');
    const [nrPuncte, setNrPuncte] = useState('');
    const [mentiuniAdversar, setMentiuniAdversar] = useState('');
    const [codSecretAdversar, setCodSecretAdversar] = useState('');
    const [storageStand,setStorageStand] = useState('');
    const [storageNume,setStorageNume] = useState('');
    const [codSecretAdversarReal,setCodSecretAdversarReal] = useState('');
    //const [meciuriLuate,setMeciuriLuate] = useState('');
    //const [tempunu,setTempp] = useState(0);
    //const [tempdoi,setTemppp] = useState(0);
    
    //const [numberr,setNumberr] = useState(0);
    


    //const { NrSector, NumePrenume, CodSecret } = location.state || {};

    /*useEffect(() => {
        const intervalId = setInterval(() => {
            const formattedTime = new Date().toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit", // Include seconds
                hour12: true,
            });
            setCurrentTime(formattedTime);
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const fetchTime = async () => {
        try {
            //onst timpClass = new BackendService();
            const time = await HelloWorldClass.time(); // Call the hello method
            setCurrentTime(time); // Update the state with the fetched time
        } catch (error) {
            console.error('Error fetching time:', error);
        }
    };*/

    /*const addRow = ()=>{
        if(etape!=0){
            setIsModalOpen(true);
        const newRow = [];
        for (let i = 0; i < 6; i++) {
            newRow.push(`Row ${rows.length + 1}, Column ${i + 1}`);
        }
        setRows([...rows, newRow]);
        setEtape(etape-1);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data, e.g., send it to the server
        console.log(formMansaData);
        // Close the modal
        setIsModalOpen(false);
      };*/

      useEffect(()=>{  // when component mounts to get from local and put rows
       //const etape
       //console.log("Fetching data...");
        const standToUse = localStorage.getItem('storedStand');
        setStorageStand(standToUse);
        //console.log(standToUse);
        const numeToUse = localStorage.getItem('storedNume');
        setStorageNume(numeToUse);

        if(!data){
          fetchRezultate();
          //InsertRowsTakenSQL();
        }
        //if(data !=null && updatat == false){
       //   InsertRowsTakenSQL();
        //  setUpdatat(true);
        //}
         //fetchRezultate().then(()=>{
         // console.log("rerereerere");
         // console.log(meciuriLuate);
        // });
         
                //ssetNumberr(numberr+1);
        //console.log("useffect temp1:"+temp1);
       // console.log(meciuriLuate);
      }); 

      const fetchRezultate = async () => {
        
        const toate_meciurile= await BackendService.getMeciuri(storageStand);
        //console.log(toate_meciurile);
        //setMeciuriLuate(toate_meciurile);
        const response = JSON.parse(toate_meciurile);
        setData(response);
        console.log(response);
        console.log(response.length);

        const randuri = await InsertRowsTakenSQL(response);
        console.log(randuri);
        //console.log(meciuriLuate);
        //return toate_meciurile;
        
    };
  //useEffect(() => {
      
      //console.log(data);
      
  //},[data]);
    //setNr(34);
    

      const fetchCodeReal = async () => {
        try{
        
          const tempSecReal = await sectorToReal();
          //console.log("TEMPPPPPPP CODEEEEE  "+ tempSecReal);
          //console.log(typeof tempSecReal);
          //console.log(tempSecReal);
          //setActualSectorAdversar(tempSecReal);
          //console.log(actualSectorAdversar);
          const response = await BackendService.getCode(tempSecReal);
          //console.log(response)
          const jsonObject = JSON.parse(response);
          const codSecretAdversar = jsonObject.rows[0].cod_privat;
          //codtemp1 = codSecretAdversar.toString();
          // Now you can compare codSecretAdversar with your local codSecretAdversar
          //console.log("Retrieved cod_secret for sector:", codtemp1);
          //setCodSecretAdversarReal(codtemp1);
          //console.log(codSecretAdversarReal);
          //return codSecretAdversar;
          return codSecretAdversar;
        
      }catch{}
      };

     
    
    

      const InsertRowsTakenSQL = async (datat) => {
        console.log(datat.length);
        for(let i=0;i<datat.length;i++){
          const newRow = [
            i+1, 
            datat[i].standet,
            datat[i].capturi_proprii,
            datat[i].capturi_adversar,
            datat[i].puncte,
            datat[i].mentiuni,
            //item.
            //codSecretAdversar
        ];
        setRows(prevRows => [...prevRows, newRow]); // Append newRow to the existing rows
        //const grr = await numere();
       // setUpdatat(grr);
        //console.log(grr + i);
        setNrMansa(prevNrMansa => prevNrMansa + 1); // Update nrMansa by the length of the data array
        setEtape(prevEtape => prevEtape - 1);
      }
         //setRows([...rows, newRow]);
        
        //setIsModalOpen(false);
        
        return "randurile au fost inserate"
      };

      /*useEffect(() => {
        try{
        const fetchCode = async () => {
          const comboResult = await fetchCodeReal();
          const codSecretValuee = comboResult;
          //console.log(typeof codSecretValuee);
          //setCodSecretAdversarReal(codSecretValuee);
          //const inregistratt = comboResult.inregistratBool;
          //setInregistratValue(inregistratt);
          console.log("Value of cod_privat:", codSecretValuee);
          
          //console.log("Value of inregistrat:", inregistratt);
          return codSecretValuee;
        }
        }catch(error){
          console.error('Error fetching code:', error);
        };
        fetchCode().then((codSecretValuee)=>{
          setCodSecretAdversarReal(codSecretValuee);
          console.log(codSecretAdversarReal);
        });
        
      }, [sectorAdversar]);*/

      useEffect(() => {
        const fetchCode = async () => {
          try {
            const actualStand = await fetchCodeReal();
            //console.log(actualStand);
            //setActualSectorAdversar(actualStand);
            const codSecretValuee = actualStand ;
           // console.log("Value of cod_privat:", codSecretValuee);
            setCodSecretAdversarReal(codSecretValuee);
            return codSecretValuee;
          } catch (error) {
            console.error('Error fetching code:', error);
          }
        };
      
        // Call fetchCode and handle the returned value
        fetchCode().then((codSecretValuee) => {
          console.log(codSecretValuee); // This will log the updated value
        });
      }, [sectorAdversar]);

      const addRow = () => {
        if(etape!=0){
            setIsModalOpen(true);
        }
      }

    const sectorToReal = async () =>{

        let sectorAdvNr = sectorAdversar.toString();//parseInt(
        //let temp1 = 0;
        //let temp2 = 0;
        //console.log("sector adv: "+sectorAdvNr );
        //console.log
        console.log(sectorAdvNr);
      if (sectorAdvNr % 2 == 1) {
          let temp1 = parseInt(sectorAdvNr) - (2 * (nrEtapeNEMOD - etape));          
          
          if (temp1 <= 0) {
            //setTemppp((nrStanduri - tempunu));
            temp1 = nrStanduri - temp1;
          }
          //setActualSectorAdversar(temp1);
          console.log(temp1);

          return temp1.toString();
        } 
        else {
         // setTemp2(sectorAdversar + 2 * (nrEtapeNEMOD - etape));
         let temp2 = parseInt(sectorAdvNr) + 2 * (nrEtapeNEMOD - etape);
         //console.log(sectorAdvNr);
         //console.log(sectorAdvNr + 2 * (nrEtapeNEMOD - etape));
        // console.log(temp2);
         if (temp2 > nrStanduri) {
           // setTemp2( temp2-nrStanduri);
           temp2 = temp2 - nrStanduri;
          }
         // setActualSectorAdversar(temp2);
         //setActualSectorAdversar(temp2);
         console.log(temp2);
         return temp2.toString();
        }
        
    
        // Fetch cod_secret for the actualSectorAdversar
        //console.log(actualSectorAdversar);
        //console.log("haidiiii");
        

       // return 1;
    }



    
    const sendEtapaSQL = async () => {
      try {
        //let tempSectorAdversar;
        //const grr = sectorToReal();

       // getCodeStand();
       //const sectorAdev= sectorToReal();
       //console.log(typeof sectorAdev);
       //console.log(sectorAdev);

       //const codStandReal = getCodeStand();
       //console.log(typeof codStandReal);
       //console.log("Cod stand real"+codStandReal);

        console.log(typeof codSecretAdversar);
        console.log(typeof codSecretAdversarReal);
        console.log(codSecretAdversar == codSecretAdversarReal.toString());

        if (codSecretAdversar == codSecretAdversarReal.toString()) { // Check your condition here
          const trimtRezultatEtapa = await BackendService.addEtapa(
            storageStand,
            sectorAdversar,
            capturiProprii,
            capturiAdversar,
            nrPuncte,
            mentiuniAdversar,
            codSecretAdversar
          );
          console.log(trimtRezultatEtapa);
          alert("Etapa cu nr. " + nrMansa + " a fost trimisa cu succes.");
        } else {
          alert("Etapa cu nr. " + nrMansa + " NU A FOST TRIMISA");
        }
     } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the stage.");
      }
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRow = [
            nrMansa,
            sectorAdversar,
            capturiProprii,
            capturiAdversar,
            nrPuncte,
            mentiuniAdversar,
            //codSecretAdversar
        ];
        

        const trimis = sendEtapaSQL();

        setRows([...rows, newRow]);
        setNrMansa(nrMansa+1);
        setEtape(etape-1);
        setIsModalOpen(false);
        // Clear form fields
        setSectorAdversar('');
        setCapturiProprii('');
        setCapturiAdversar('');
        setNrPuncte('');
        setMentiuniAdversar('');
        setCodSecretAdversar('');
         
    }

        




    //const timpClass = new HelloWorldClass();
    //const timpLegit = timpClass.hello("vLAD");

    /*const fetchSecret = async () => {
      // setLoading(true);
        try {
          const secret = await HelloWorldClass.hello("Vlad");
          setSecret(secret);
        } catch (error) {
          console.error(error);
          navigate('/login');
        }
       // setLoading(false);
    };*/
 // formData.NumePrenume formData.NumePrenume formData.NumePrenume
return (
    <>
    
    <div className='box-informatii'>
        <div className='column'>
            <div className='date-concurent'>
                <div  className='nume-concurent'>nume concurent:{storageNume}</div>
                <div className='sector-concurent'>sector de start {storageStand}</div>
            </div>
            <div className='etape-ramase'>
                Etape ramase: {etape}<br></br>
                Nr. next mansa: {nrMansa}
            </div>
        </div>
        <div className='column'>
            <div className='adauga-mansa' onClick={addRow}>
                <div>Adauga Rezultat Mansa<br></br>Click!</div>
            </div>          
        </div>
    </div>
    
    <div className='tabela'>
    <table className="custom-table">
            <thead>
                <tr>
                    <th>Nr. mansa</th>
                    <th>Sector adversar</th>
                    <th>Capturi proprii</th>
                    <th>Acpturi adversar</th>
                    <th>Puncte</th>
                    <th>Mentiuni adversar</th>

                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, idx) => (
                            <td key={idx}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
            
    </div>
    {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='rez-mansa'>
                <h2>Rezultat nou</h2>
                <div className='nr-mansa'>Nr. mansa: {nrMansa}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                Sector adversar:
                <input
                  type="text"
                  value={sectorAdversar}
                  onChange={(e) =>
                    setSectorAdversar( e.target.value )
                  }
                  required
                />
              </label>
              <label>
                Capturi proprii:
                <input
                  type="text"
                  value={capturiProprii}
                  onChange={(e) =>
                    setCapturiProprii( e.target.value )
                  }
                  required
                />
              </label>
              <label>
                Capturi adversar:
                <input
                  type="text"
                  value={capturiAdversar}
                  onChange={(e) =>
                    setCapturiAdversar( e.target.value )
                  }
                  required
                />
              </label>
              <label>
                Nr. puncte:
                <input
                  type="text"
                  value={nrPuncte}
                  onChange={(e) =>
                    setNrPuncte( e.target.value )
                  }
                  required
                />
              </label>
              <label className='meniuni-adversar'>
                Mentiuni adversar:
                 <textarea
                        id="mentions"
                        value={mentiuniAdversar}
                        onChange={(e) =>
                            setMentiuniAdversar( e.target.value )
                        }
                        rows={5} // Set the number of visible rows
                        cols={30} // Set the number of visible columns
                        style={{ resize: 'vertical' }} // Allow vertical resizing
                    />
              </label>
              <label className='cod-secret-adversar'>
                Cod secret adversar:
                <input
                  type="text"
                  value={codSecretAdversar}
                  onChange={(e) =>
                    setCodSecretAdversar( e.target.value )
                  }
                  required
                />
              </label>
            
              <button type="submit" className='submit-button'>Submit</button>
            </form>
            <button className='close-button' onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    
    </>

    
);
}

export default Conectat;