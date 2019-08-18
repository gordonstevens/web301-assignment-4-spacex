// Import React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import Vendor Libraries
import axios from 'axios';
import PropTypes from 'prop-types';

// Import Components
import Card from '../../components/Card/Card';

/*
    This is interesting
    REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    REF: https://www.freecodecamp.org/forum/t/filtering-json-object/244160
    REF: https://stackoverflow.com/questions/23720988/how-to-filter-json-data-in-javascript-or-jquery
    REF: https://codereview.stackexchange.com/questions/162633/javascript-filter-on-json-object
*/

const RocketOne = (props) => {

    /*
    {
        "id":1,
        "active":false,
        "stages":2,
        "boosters":0,
        "cost_per_launch":6700000,
        "success_rate_pct":40,
        "first_flight":"2006-03-24",
        "country":"Republic of the Marshall Islands",
        "company":"SpaceX",
        "height":{
            "meters":22.25,
            "feet":73
        },
        "diameter":{
            "meters":1.68,
            "feet":5.5
        },
        "mass":{
            "kg":30146,
            "lb":66460
        },
        "payload_weights":
            [
                {
                    "id":"leo",
                    "name":"Low Earth Orbit",
                    "kg":450,
                    "lb":992
                }
            ],
        "first_stage":{
            "reusable":false,
            "engines":1,
            "fuel_amount_tons":44.3,
            "burn_time_sec":169,
            "thrust_sea_level":{
                "kN":420,"lbf":94000
            },
            "thrust_vacuum":{
                "kN":480,"lbf":110000
            }
        },
        "second_stage":{
            "reusable":false,"engines":1,"fuel_amount_tons":3.38,"burn_time_sec":378,"thrust":{"kN":31,"lbf":7000},
            "payloads":{
                "option_1":"composite fairing",
                "composite_fairing":{
                    "height":{
                        "meters":3.5,"feet":11.5
                    },
                    "diameter":{
                        "meters":1.5,"feet":4.9
                    }
                }
            }
        },
        "engines":{
            "number":1,
            "type":"merlin",
            "version":"1C",
            "layout":"single",
            "engine_loss_max":0,
            "propellant_1":"liquid oxygen",
            "propellant_2":"RP-1 kerosene",
            "thrust_sea_level":{
                "kN":420,
                "lbf":94000
            },
            "thrust_vacuum":{
                "kN":480,
                "lbf":110000
            },
            "thrust_to_weight":96
        },
        "landing_legs":{
            "number":0,
            "material":null
        },
        "flickr_images":
            [
                "https://www.spacex.com/sites/spacex/files/styles/media_gallery_large/public/2009_-_01_liftoff_south_full_wide_ro8a1280_edit.jpg?itok=8loiSGt1",
                "https://www.spacex.com/sites/spacex/files/styles/media_gallery_large/public/2009_-_02_default_liftoff_west_full_wide_nn6p2062_xl.jpg?itok=p776nHsM"
            ],
        "wikipedia":"https://en.wikipedia.org/wiki/Falcon_1",
        "description":"The Falcon 1 was an expendable ... the Earth.",
        "rocket_id":"falcon1",
        "rocket_name":"Falcon 1",
        "rocket_type":"rocket"
    },
    */

    /*
    

    let rocketData = 


    const data = [
        {
            name: 'Bob',
            gender: 'male',
            age: 34,
        },
        {
            name: 'Carol',
            gender: 'female',
            age: 36,
        },
        {
            name: 'Ted',
            gender: 'male',
            age: 38,
        },
        {
            name: 'Alice',
            gender: 'female',
            age: 40,
        },
    ];

    

    const arr1 = data.filter(d => d.age > 37);
    console.log('arr1', arr1);

    const arr2 = data.filter(d => d.gender === 'female');
    console.log('arr2', arr2);

    const ageAndGender = d => d.age > 37 && d.gender === 'female';

    const arr3 = data.filter(ageAndGender);
    console.log('arr3', arr3);
    
    */
// let annoyingCORSJSONdata
    let { rocketPropId } = props.match.params;

    if ( (!props.match.params.rocketPropId) || (props.match.params.rocketPropId.typeOf === null) ) { rocketPropId = 1; }
    
    const [rocketData, setRocketData] = useState([]);

    const [rocketOneData, setRocketOneData] = useState([]);

    useEffect(() => {

        // Load rocket data
        let annoyingCORSJSONdata = `../../spacex-rockets.json`; // `https://api.spacexdata.com/v3/rockets`
        
        axios.get(annoyingCORSJSONdata,
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
                    id: rocketArray.id, // Id as a number
                    rocketid: rocketArray.rocket_id, // Id as a non-spaced name
                    rocketname: rocketArray.rocket_name, // Actual rocket name
                    cost_per_launch: rocketArray.cost_per_launch,
                    successrate: rocketArray.success_rate_pct,
                    description: rocketArray.description,
                    wikipedia: rocketArray.wikipedia // Extra piece of information of my choosing
                }
            });
            //console.log(JSON.stringify(rocketArray));
            setRocketData(rocketArray);
            let rocketOne = rocketData.filter( rocket => ( (rocket === rocketPropId) || (rocket === rocketPropId) ) );
            setRocketOneData(rocketOne);
            console.log("Rocket ONE Data: " + JSON.stringify(rocketOneData));
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

    // This generates Cross Origin Resource Sharing (CORS) errors but essentially because I do not have a proxy or own spacexdata.com, I cannot fix this.
    // Moreover I get insufficient resource errors, so back to local JSON files from the /public directory... 
                    
                    
                 /*   
        (rocketCard) => {
        console.log(rocketPropId);
        if ( (rocketCard.rocketname === rocketPropId) || (rocketCard.id === rocketPropId) ) {
            return (
                <Card>
                    <div key={rocketCard.id}>
                        Rocket Name: {rocketCard.rocketname}<br />
                        Description: {rocketCard.description}<br />
                        WikiPedia Link: <a href={rocketCard.wikipedia} target="_blank" rel="noopener noreferrer">{rocketCard.rocketname}</a><br /><br />
                        <Link to={`/rockets/`}>Back to List of Rockets</Link>
                    </div>
                </Card>
            );
        }
        else {
            return (<React.Fragment></React.Fragment>);
        }
        */
    //})

    
   return (
        <React.Fragment>
           
           {
               /*
                rocketData.map((rocketCard) => {
                    console.log(rocketPropId);
                    if ( (rocketCard.rocketname === rocketPropId) || (rocketCard.id === rocketPropId) ) {
                        return (
                            <Card>
                                <div key={rocketCard.id}>
                                    Rocket Name: {rocketCard.rocketname}<br />
                                    Description: {rocketCard.description}<br />
                                    WikiPedia Link: <a href={rocketCard.wikipedia} target="_blank" rel="noopener noreferrer">{rocketCard.rocketname}</a><br /><br />
                                    <Link to={`/rockets/`}>Back to List of Rockets</Link>
                                </div>
                            </Card>
                        );
                    }
                    else {
                        return (<React.Fragment></React.Fragment>);
                    }
                })
                */
                
            }
        </React.Fragment>
    );
}

// Props
/*
propTypes REFERENCE URL: https://www.npmjs.com/package/prop-types
rocketNameId - number or string
*/
RocketOne.propTypes = {
   rocketNameId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
   ]),
}

export default RocketOne;
