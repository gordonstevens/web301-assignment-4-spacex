// Import React, Component, CSS and Vendor Library
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import axios from 'axios';

const About = () => {

    const [aboutData, setAboutData] = useState({});

    // This generates Cross Origin Resource Sharing (CORS) errors but essentially because I do not have a proxy or own spacexdata.com, I cannot fix this.
    // Moreover I get insufficient resource errors, so back to local JSON files from the /public directory... 

    useEffect(() => {
        // Load about data
        
        let annoyingCORSJSONdata = `spacex-info.json`; // `https://api.spacexdata.com/v3/info`
        
        axios.get(annoyingCORSJSONdata,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
        .then((response) => {
            //console.log(JSON.stringify(response.data));
            setAboutData(response.data);
        })
        .catch((error) => {
            // Ready for any type of error, REF: https://github.com/axios/axios#handling-errors
            if (error.response) {
                console.log("Response Error (data): " + error.response.data);
                console.log("Response Error (status): " + error.response.status);
                console.log("Response Error (headers): " + error.response.headers);
            }
            else if (error.request) { console.log("Request Error: " + error.request); }
            else { console.log("Error: " + error.message); }
            console.log(error.config);
        })
        .finally(() => { });
    }, []);
    
    return (
        <React.Fragment>
            <Card>
                Company Name: {aboutData.name}<br />
                Founded: {aboutData.foundedyear}<br />
                CEO: {aboutData.ceo}<br />
                COO: {aboutData.coo}<br />
                Valuation (USD): {aboutData.valuation}<br /><br />
                Summary: {aboutData.summary}<br /><br />
                [ <Link to="/">Go Back to Historical Data</Link> ]
            </Card>
        </React.Fragment>
    );
}

export default About;
