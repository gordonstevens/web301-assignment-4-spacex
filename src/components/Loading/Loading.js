// Import React, CSS and Image
import React from 'react';
import styles from './Loading.module.css';
import loadingEgg from './Loading-0.gif';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <img src={loadingEgg} alt="Loading..." />
        </div>
    );
}

export default Loading;
