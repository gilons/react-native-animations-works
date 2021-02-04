import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { PinchGestureHandler, State, ScrollView } from 'react-native-gesture-handler';

export function GlowingImage(props) {
    const _baseScale = React.useRef(new Animated.Value(1)).current;
    const _pinchScale = React.useRef(new Animated.Value(1)).current;
    const _scale = Animated.multiply(_baseScale, _pinchScale)
    const _lastScale = React.useRef(1)
    const onZoomEvent = Animated.event([
        {
            nativeEvent: { scale: _pinchScale }
        }
    ], { useNativeDriver: true })

    const onZoomStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            _lastScale.current *= parseFloat(event.nativeEvent.scale);
            _baseScale.setValue(_lastScale.current)
            _pinchScale.setValue(1)
            //scale.setValue(event.nativeEvent.scale)
        }
    }

    return (
        <ScrollView scrollEventThrottle={40} style={{
            height: '100%',
            width: '100%'
        }} >
        <View style={styles.imageContainer}>
            <View style={styles.imageStyles}>
                    <PinchGestureHandler
                        onGestureEvent={onZoomEvent}
                        onHandlerStateChange={onZoomStateChange}
                    >
                        <Animated.Image
                            resizeMode='cover'
                            source={{
                                uri:
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpXl9g0vC4nYwBF2zHZM-v4uZFrhwqGftRww&usqp=CAU',
                            }}
                            style={[styles.animatedImageStyle, { transform: [{ perspective: 200 }, { scale: _scale }] }]}
                        />
                    </PinchGestureHandler>
            </View>
        </View>
        </ScrollView>

    );
}
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    imageStyles: {
        elevation: 4,
        borderRadius: 6,
        margin: 'auto',
        overflow: 'hidden',
        alignSelf: 'center',
        height: 350,
        backgroundColor: 'white',
        width: width * .90,
        marginTop: '3%',
    },
    animatedImageStyle: {
        width: '100%',
        height: '100%'

    },
});
