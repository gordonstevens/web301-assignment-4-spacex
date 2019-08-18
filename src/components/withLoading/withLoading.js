// Import React, CSS and images
import React, { useState, useEffect } from 'react';
import styles from './withLoading.module.css';
import loadingEgg from './Loading-0.gif';

const withLoading = (WrappedComponent, enhancedProps = {}) => {
    return (props) => {
        const [loading, setLoading] = useState(true);    
        useEffect(() => {
            const loadingTimer = setTimeout(() => {
                clearTimeout(loadingTimer);
                setLoading(false);
            }, 1750)
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

export default withLoading;
