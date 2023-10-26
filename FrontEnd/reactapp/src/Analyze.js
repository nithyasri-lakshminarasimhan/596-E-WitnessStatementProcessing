import './App.css';
import { useRef } from 'react';         
import axios from "axios";
import Button from '@mui/material/Button';
import DescriptionIcon from '@mui/icons-material/Description';
import FileContentDisplay from './FileContentDisplay';
import { useState } from 'react';


function Analyze() {
    const hiddenFileInput = useRef(null);
    const [fileContent, setFileContent] = useState('');

    const handleClick = event => {
        hiddenFileInput.current.click();
    };


    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text);
            // alert(text);
            sendData(text)
        };
        reader.readAsText(e.target.files[0]);
    }

    function sendData(text) {
        axios({
            method: "POST",
            url: "/QandA",
            data: {
                statement: text
            }
        })
            .then((response) => {
                const res = response.data
                // alert(res);
                setFileContent(res);
                // setProfileData(({
                //     profile_name: res.name,
                //     about_me: res.about
                // }))
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }
     
    return (
        <div className="Analyze">
            <header className="App-header">
                
                <Button onClick={handleClick}><DescriptionIcon fontSize='large'></DescriptionIcon> Add New Statement</Button>
                <FileContentDisplay content={fileContent}/>
                <input
                    type="file"
                    onChange={(e) => showFile(e)}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
            </header>
        </div>
    );
}

export default Analyze;
