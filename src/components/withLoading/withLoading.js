// Import React, CSS, images and vendor library
import React, { useState, useEffect } from 'react';
import styles from './withLoading.module.css';
import loadingEgg from './Loading-1.gif';
import PropTypes from 'prop-types';

const withLoading = (WrappedComponent, enhancedProps = {}) => {
    return (props) => {
        const [loading, setLoading] = useState(true);    
        useEffect(() => {
            const loadingTimer = setTimeout(() => {
                clearTimeout(loadingTimer);
                setLoading(false);
            }, 2500)
        }, []);
        return (
            <React.Fragment>
                {
                    loading ? (
                        <div className={styles.loading}>
                            <img src={loadingEgg} alt="Loading..." />
                        </div>    
                    ):(
                        <WrappedComponent {...props} {...enhancedProps} />
                    )
                }
            </React.Fragment>
        );
    };
}

// Props
/*
propTypes REFERENCE URL: https://www.npmjs.com/package/prop-types
children - any // Needs to be "any" type because ANYTHING can be passed to the card
*/
withLoading.propTypes = {
    children: PropTypes.oneOfType([
       PropTypes.any
    ]),
}

export default withLoading;
