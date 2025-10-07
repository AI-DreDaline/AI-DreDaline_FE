import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import runner from '../assets/images/runner.png';
import baseball from '../assets/images/baseball.png';
import butterfly from '../assets/images/butterfly.png';
import duck from '../assets/images/duck.png';
import horse from '../assets/images/horse.png';
import clover from '../assets/images/clover.png';
import round from '../assets/images/round.png';
import map from '../assets/images/map.png';

export default function RecommendedRouteScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.topline}>
                <Text style={styles.title}>모양 선택하기</Text>
                <Text style={styles.more}>더보기</Text>
            </View>
            <View style={styles.template}>
                <View style={styles.eachtemplate}>
                    <Image
                        source={runner}
                        style={{ width: 52, height: 52}}
                    />
                    <Text style={styles.eachtitle}>러닝</Text>
                </View>
                <View style={styles.eachtemplate}>
                    <Image
                        source={baseball}
                        style={{ width: 52, height: 52}}
                    />
                    <Text style={styles.eachtitle}>야구공</Text>
                </View>
                <View style={styles.eachtemplate}>
                    <Image
                        source={butterfly}
                        style={{ width: 52, height: 52}}
                    />
                    <Text style={styles.eachtitle}>나비</Text>
                </View>
                <View style={styles.eachtemplate}>
                    <Image
                        source={duck}
                        style={{ width: 52, height: 52}}
                    />
                    <Text style={styles.eachtitle}>오리</Text>
                </View>
                <View style={styles.eachtemplate}>
                    <Image
                        source={horse}
                        style={{ width: 52, height: 52}}
                    />
                    <Text style={styles.eachtitle}>체스말</Text>
                </View>
                <View style={styles.eachtemplate}>
                    <Image
                        source={clover}
                        style={{ width: 52, height: 52}}
                    />
                    <Text style={styles.eachtitle}>클로버</Text>
                </View>
            </View>

            <View style={styles.map}>
                <Image
                    source={map}
                    style={styles.mapsize}
                />
                <View style={styles.mapgreen}/>
                <Image
                    source={round}
                    style={styles.round}
                />
            </View>
            
            {/* 나중에 지도나 코스 리스트 들어갈 부분 */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    topline: {
        height: 33,
        backgroundColor: '#141414',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 17,
        fontWeight: '300',
    },
    more: {
        color: '#39FF14',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 3,
        textDecorationLine: 'underline',
    },
    template:{
        height: 79,
        backgroundColor: '#141414',
        paddingTop: 9,
        paddingHorizontal: 17,
        paddingBottom: 0,
        flexDirection: 'row',
    },
    eachtemplate:{
        backgroundColor: 'brown',
        width: 53,
        alignItems: 'center',
        marginRight: 20,
    },
    eachtitle: {
        paddingTop: 3,
        color: '#ffffff',
        fontSize: 12,
    },
    round: {
        width: 350,
        height: 350,
    },
    mapsize: {
        width: 330,
        height: 330,
        position: 'absolute',
        top: 30,
        left: 32,
    },
    map:{
        backgroundColor: 'purple',
        height: 389,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapgreen:{
        width: 333,
        height: 168,
        backgroundColor: 'rgba(57, 255, 20, 0.36)',
        position: 'absolute',
        top: 76,
        left: 32,
    },
    subtitle: {
        color: '#ccc',
        fontSize: 16,
    },
});
