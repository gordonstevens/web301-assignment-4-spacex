// Import React and Vendor Library
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components
import HeadBanner from './components/HeadBanner/HeadBanner';
import FootBanner from './components/FootBanner/FootBanner';
import withLoading from './components/withLoading/withLoading';

// Import Pages
import Historical from './pages/Historical/Historical';
import RocketAll from './pages/RocketAll/RocketAll';
import RocketOne from './pages/RocketOne/RocketOne'
import About from './pages/About/About';

// Import CSS
import styles from './App.module.css';

function App() {
    return (
        <React.Fragment>
            {
                <div className={styles.app}>
                    <HeadBanner />
                    <Switch>
                        <Route exact path="/" component={Historical} />
                        <Route path="/about" component={About} />
                        <Route exact path="/rockets/" component={RocketAll} />
                        <Route path="/rockets/:rocketPropId" component={RocketOne} />
                    </Switch>
                    <FootBanner />
                </div>
            }
        </React.Fragment>
    );
}

export default withLoading(App);
