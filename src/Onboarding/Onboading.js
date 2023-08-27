import { View, Text, StyleSheet, Animated, SafeAreaView, Button, Image, StatusBar, Dimensions, Easing } from 'react-native'
import React, { useRef } from 'react'


const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default function Onboading() {
    // animation value
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const circleScaleAnim = useRef(new Animated.Value(0)).current;
    const iconScaleAnim = useRef(new Animated.Value(0)).current;
    const circlePositionAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const fadeinAnim = useRef(new Animated.Value(0)).current;





    // sequence animation
    Animated.sequence([
        Animated.timing(scaleAnim, {
            toValue: 28,
            delay: 700,
            duration: 2500,
            useNativeDriver: true,
        }),
        Animated.stagger(400, [
            Animated.parallel([
                Animated.timing(circleScaleAnim, {
                    toValue: 60,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(circlePositionAnim, {
                    toValue: { x: 22, y: 0 },
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
            ,
            Animated.parallel([
                Animated.timing(iconScaleAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeinAnim, {
                    toValue: 1,
                    delay: 600,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]),

    ]).start()


    // animated scaling effect for circle while position right
    const circleScale = circleScaleAnim.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 100],
    })

    // Animated rotation with scaling effect
    const rotate = scaleAnim.interpolate({
        inputRange: [0, 40],
        outputRange: ['0deg', '260deg']
    })

    // circle will position right with scaling effect
    const circleRight = circleScaleAnim.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 2]
    })



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor='black'
                barStyle="light-content"
            />
            <Animated.Image
                style={{
                    width: 200,
                    height: 300,
                    resizeMode: 'contain',
                    transform: [
                        { scale: scaleAnim },
                        { rotate: rotate }
                    ]
                }}
                source={require('../../assets/images/logo.png')}
            />
            {/* white circle */}
            <Animated.View
                style={[
                    styles.whiteCircle,
                    {
                        transform: [
                            {
                                scale: circleScaleAnim
                            },
                            {
                                translateX: circlePositionAnim.x
                            },
                            // {
                            //     translateY: circlePositionAnim.y
                            // }
                        ]
                    },
                ]} />

            {/* logo here */}
            <Animated.Image
                source={require('../../assets/images/heyome-icon.png')}
                style={[
                    styles.heyomeIcon,
                    {
                        transform: [{ scale: iconScaleAnim }]
                    },
                ]}
            />

            {/* animated text */}
            <Animated.View
                style={[
                    styles.helloText,
                    {
                        opacity: fadeinAnim,
                    }
                ]}
            >
                <Text style={{ fontFamily: 'Bakbak', fontSize: 26, lineHeight: 26 }}>Enjoy your day </Text>
                <Text style={{ fontFamily: 'Bakbak', fontSize: 26, lineHeight: 26 }}>with </Text>
                <Text style={{ fontFamily: 'Bakbak', fontSize: 26, lineHeight: 26 }}>heyome </Text>
            </Animated.View>

            <Animated.Image
                style={[
                    styles.graficImage,
                    {
                        opacity: fadeinAnim,
                    }
                ]}
                source={require('../../assets/images/Union.png')} />

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    helloText: {
        position: 'absolute',
        bottom: 70,
        left: 30,
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: 'space-evenly',
        marginVertical: 16,
    },
    whiteCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: ScreenHeight / 2 + 90,
        left: ScreenWidth / 2 - 70,
    },
    heyomeIcon: {
        width: 126,
        height: 126,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: ScreenHeight / 2 + 150,
    },
    graficImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        right: -50,
    },
});