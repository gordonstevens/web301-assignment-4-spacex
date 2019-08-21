// Import React and Vendor Library
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

// Import Components
import HeadBanner from './components/HeadBanner/HeadBanner';
import withLoading from './components/withLoading/withLoading';

// Import Pages
import Historical from './pages/Historical/Historical';
import RocketAll from './pages/RocketAll/RocketAll';
import RocketOne from './pages/RocketOne/RocketOne';
import About from './pages/About/About';

// Import CSS
import styles from './App.module.css';

function App() {

    const [rocketData, setRocketData] = useState([]);
    const [aboutData, setAboutData] = useState({});

    // This generates Cross Origin Resource Sharing (CORS) errors but essentially because I do not have a proxy or own spacexdata.com, I cannot fix this.
    // Moreover I get insufficient resource errors, so back to local JSON files from the /public directory... 

    useEffect(() => {

        // =========
        // Define URLs for data
        // =========
        let infoDataUrl = `spacex-info.json`; // `https://api.spacexdata.com/v3/info`
        let rocketData = `spacex-rockets.json`; // `https://api.spacexdata.com/v3/rockets`

        // Moved loading historical JS object to Historical.js to improve load time

        // =========
        // Load about data
        // =========        
        axios.get(infoDataUrl,
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

        // =========
        // Load rocket data
        // =========
        axios.get(rocketData,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )        
        .then((response) => {
            let rocketArray = [];
            rocketArray = response.data.map(rocketArray => {
                return {
                    id: rocketArray.id,
                    rocketid: rocketArray.rocket_id,
                    rocketname: rocketArray.rocket_name,
                    cost_per_launch: rocketArray.cost_per_launch,
                    successrate: rocketArray.success_rate_pct,
                    description: rocketArray.description,
                    wikipedia: rocketArray.wikipedia // extra piece of information of my choosing
                }
            });
            //console.log(JSON.stringify(rocketArray));
            setRocketData(rocketArray);
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
    });

    // Flow data from axios GET to state variable, then pass to component (page) for usage 
    return (
        <React.Fragment>
            {
                <div className={styles.app}>
                    <HeadBanner />
                    <Switch>
                        <Route exact path="/" component={Historical} />
                        <Route path="/about" render={ () => { return ( <About aboutData={aboutData} /> ); } } />
                        <Route exact path="/rockets/" render={ () => { return ( <RocketAll rocketData={rocketData} /> ); } } />
                        <Route path="/rockets/:rocketPropId" component={RocketOne} />
                    </Switch>
                </div>
            }
        </React.Fragment>
    );
}

export default withLoading(App);
