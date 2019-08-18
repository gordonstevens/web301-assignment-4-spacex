// Import React, Component and Vendor Library
import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import axios from 'axios';

const Historical = () => {
    const [historicalData, setHistoricalData] = useState([]);

    /*
    spacex-history.json:
    [{
        "id":1,
        "title":"Falcon 1 Makes History",
        "event_date_utc":"2008-09-28T23:15:00Z",
        "event_date_unix":1222643700,
        "flight_number":4,
        "details":"Falcon 1 becomes the first privately developed liquid fuel rocket to reach Earth orbit.",
        "links":{"reddit":null,"article":"http://www.spacex.com/news/2013/02/11/flight-4-launch-update-0","wikipedia":"https://en.wikipedia.org/wiki/Falcon_1"}}, ...]
    
    */

    // This generates Cross Origin Resource Sharing (CORS) errors but essentially because I do not have a proxy or own spacexdata.com, I cannot fix this.
    // Moreover I get insufficient resource errors, so back to local JSON files from the /public directory... 

    useEffect(() => {
        // Load historical data
        
        let annoyingCORSJSONdata = `spacex-history.json`; // `https://api.spacexdata.com/v3/history`
        
        axios.get(annoyingCORSJSONdata,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((response) => {
            let historicalArray = [];
            historicalArray = response.data.map(historicalArray => {
                return {
                    id: historicalArray.id,
                    title: historicalArray.title,
                    event_date_utc: historicalArray.event_date_utc,
                    details: historicalArray.details,
                    wikipedia: historicalArray.links.wikipedia
                }
            });
            //console.log(JSON.stringify(historicalArray));
            setHistoricalData(historicalArray);
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
            .finally(() => {}
            );
    });

    // Using A HREF to send to wikipedia in a new window REF: https://github.com/ReactTraining/react-router/issues/6344

    return (
        <React.Fragment>
            {
                historicalData.map((historicalCard) => {
                    return (
                        <Card>
                            <div key={historicalCard.id}>
                                Title: {historicalCard.title}<br />
                                Event Time (UTC): {historicalCard.event_date_utc}<br />
                                Details: {historicalCard.details}<br /><br />
                                <a href={historicalCard.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia Article: {historicalCard.title}</a>
                            </div>
                        </Card>
                    );
                })
            }
        </React.Fragment>
    );
}

export default Historical;
