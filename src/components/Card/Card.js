// Import React, CSS and vendor library
import React from 'react';
import styles from './Card.module.css';
import PropTypes from 'prop-types';

const Card = (props) => {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    );
}

// Props
/*
propTypes REFERENCE URL: https://www.npmjs.com/package/prop-types
A Card can receive anything!
*/
Card.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.any
   ]),
}

export default Card;
