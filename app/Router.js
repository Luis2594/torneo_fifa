import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Main from './components/Main'

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="main" component={Main} initial hideNavBar />
            </Scene>
        </Router>
    )
}

export default RouterComponent