// Import React, Component and Vendor library
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import withLoading from '../../components/withLoading/withLoading';
import PropTypes from 'prop-types';

const RocketAll = (props) => {

    // Obtain data from Axios in App.js,save as a state variable and pass to this child component
    let { rocketData } = props;

    return (
        <React.Fragment>
            {
                rocketData.map((rocketCard) => {
                    return (
                        <Card>
                            <div key={rocketCard.id}>
                                Rocket Name: {rocketCard.rocketname}<br />
                                Cost Per Launch (USD): {rocketCard.cost_per_launch}<br />
                                Success Rate: {rocketCard.successrate}%<br /><br />
                                <Link to={`/rockets/${rocketCard.rocketid}`}>More Information about {rocketCard.rocketname}</Link>
                            </div>
                        </Card>
                    );
                })
            }
        </React.Fragment>
    );
}

// Props
/*
propTypes REFERENCE URL: https://www.npmjs.com/package/prop-types
rocketAll - object
*/
RocketAll.propTypes = {
    rocketData: PropTypes.oneOfType([
       PropTypes.array
    ]),
}

export default withLoading(RocketAll);
