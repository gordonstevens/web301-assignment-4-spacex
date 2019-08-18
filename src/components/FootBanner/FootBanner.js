// Import React and CSS
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FootBanner.module.css';

const FootBanner = () => {
    return (
        <footer>
            <span className={styles.floatleft}>
                <Link to="/"><h2>SpaceX API App</h2> by Gordon Stevens</Link>
            </span>
            <span className={styles.floatright}>
                <div className={styles.mt}>
                    <Link to="/" className={styles.mr}>History</Link>
                    <Link to="/rockets" className={styles.mr}>Rockets</Link>
                    <Link to="/about">About</Link>
                </div>
            </span>
            <div className={styles.floatclear}></div>
        </footer>
    );
}

export default FootBanner;
