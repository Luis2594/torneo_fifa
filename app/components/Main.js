//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase'
import { connect } from 'react-redux'

import { loadBackground } from '../modules/actions'
import { Button } from './common'

// create a component
class Main extends Component {

    componentWillMount() {
        const ref = firebase.storage().ref('images/bg.png');
        ref.getDownloadURL()
            .then((urlBg) => {
                const ref2 = firebase.storage().ref('images/bgbtn.png');
                ref2.getDownloadURL()
                    .then((urlBgButton) => {
                        this.props.loadBackground({ urlBg, urlBgButton })
                    });
            });
    }

    loadImage() {
        if (this.props.images !== null) {
            return <ImageBackground
                style={styles.imgBackground}
                source={{ uri: this.props.images.bg }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: .9 }}></View>
                    <View style={styles.footer}>
                        
                        <Button
                            onPress={() => { }}
                            bg={this.props.images.bgbtn}
                        >
                            Generar Partido
                        </Button>

                        <Button
                            onPress={() => { }}
                            bg={this.props.images.bgbtn}
                        >
                            Ver 
                            Partidos
                        </Button>

                        <Button
                            onPress={() => { }}
                            bg={this.props.images.bgbtn}
                        >
                            Finalizar Partido
                        </Button>

                    </View>
                </View>
            </ImageBackground>
        } else {
            return <Spinner
                visible={this.props.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.loadImage()}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#66CCFC'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    footer: {
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
});

const mapStateToProps = (state) => {
    const { images, spinner } = state.main
    return { images, spinner }
}

//make this component available to the app
export default connect(mapStateToProps, { loadBackground })(Main);

