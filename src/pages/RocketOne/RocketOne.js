// Import React and Component
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withLoading from '../../components/withLoading/withLoading';

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

    let { rocketPropId } = props.match.params;    
    const [rocketOneData, setRocketOneData] = useState({});

    useEffect(() => {
        // =========
        // Load rocket data
        // =========

        // This will not suffice to get around the CORS error which is a problem at the source server
        let rocketOneDataUrl = `https://api.spacexdata.com/v3/rockets/${rocketPropId}`;
        
        axios.get(rocketOneDataUrl,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                }
            )        
        .then((response) => {
            setRocketOneData(response);
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

    return (
        <React.Fragment>
            <Card>
                <div key={rocketPropId}>
                    Rocket Name: {rocketOneData.rocket_name}<br />
                    Description: {rocketOneData.description}<br />
                    WikiPedia Link: <a href={rocketOneData.wikipedia} target="_blank" rel="noopener noreferrer">{rocketOneData.rocket_name}</a><br /><br />
                    <Link to={`/rockets/`}>Back to List of Rockets</Link>
                </div>
            </Card>
        </React.Fragment>
    );
}

// Props
/*
propTypes REFERENCE URL: https://www.npmjs.com/package/prop-types
rocketPropId - string
*/
RocketOne.propTypes = {
   rocketPropId: PropTypes.oneOfType([
      PropTypes.string
   ]),
}

export default withLoading(RocketOne);
