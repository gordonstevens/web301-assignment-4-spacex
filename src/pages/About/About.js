// Import React, Components, CSS and Vendor Library
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card'
import withLoading from '../../components/withLoading/withLoading';
import PropTypes from 'prop-types';

const About = (props) => {
    // Obtain data from Axios in App.js,save as a state variable and pass to this child component
    let { aboutData } = props;
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

// Props
/*
propTypes REFERENCE URL: https://www.npmjs.com/package/prop-types
aboutData - object
*/
About.propTypes = {
    aboutData: PropTypes.oneOfType([
       PropTypes.object
    ]),
}

export default withLoading(About);
