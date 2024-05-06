import React, { useState,useEffect } from 'react';
//import localStorage from 'local'

import './Conectat.css';
import './Modal.css'; // Import CSS file for modal styles
//import { useLocation } from 'react-router-dom';
//import { HelloWorldClass } from "@genezio-sdk/TroutArea";

function Conectat({}) { //formData
    //const location = useLocation();
    
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
        const standToUse = localStorage.getItem('storedStand');
        setStorageStand(standToUse);
        const numeToUse = localStorage.getItem('storedNume');
        setStorageNume(numeToUse);
  
      },[]); 

      const addRow = () => {
        if(etape!=0){
            setIsModalOpen(true);
        }
    }

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
    };


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
                Etape ramase: {etape}
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