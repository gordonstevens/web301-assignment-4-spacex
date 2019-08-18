// Import React and CSS
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

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
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.any,
   ]),
}

export default Card;
