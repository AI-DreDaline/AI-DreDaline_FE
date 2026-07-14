import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

import GraphSvg from '../assets/images/graph.svg';
import SettingSvg from '../assets/images/setting.svg';
import RoundSvg from '../assets/images/round.svg';
import PinSvg from '../assets/images/pin.svg';
import FlagSvg from '../assets/images/flag.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'DrawTrackRun'>;

function DrawTrackRunScreen({ navigation, route }: Props) {

    const miss_data_alarm = () => {
        Alert.alert(
          "경로를 설정하려면 시작점과 도착점을 입력해주세요.",
        );
    };

    const Make_route_EVENT = () => {
        console.log("경로 생성 이벤트 실행");
    }

    return (
        <View style={styles.container}>
          <View style={styles.topbox}>
            <View>
              <Text style={styles.boxTextone}>처음이신가요?</Text>
              <Text style={styles.boxTexttwo}>나만의 경로 그리기가 처음이라면</Text>
              <Text style={styles.boxTextthree}>튜토리얼 보러가기 {'>'}</Text>
            </View>
            <FlagSvg
              style={{width: 72, height: 72}}
/>
          </View>
            <View style={styles.topline}>
                <Text style={styles.title}>지도를 클릭하여 나만의 경로를 만드세요</Text>
                <Text style={styles.more}>둘러보기</Text>
            </View>

            <View style={styles.map}>
                <TouchableOpacity onPress={() => navigation.navigate('RecommendMap')}>
                    <Image
                        source={require('../assets/images/map.png')}
                        style={styles.mapsize}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <PinSvg
                    style={{
                        width:26,
                        height:26,
                        position: 'absolute',
                        top: 255,
                        left: 180,
                    }}
/>
                
                <TouchableOpacity onPress={() => navigation.navigate('DrawTrackMap')}>
                    <RoundSvg
                        style={styles.round}
/>
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonview}>
                <GraphSvg
                    style={{width:20, height: 25}}
/>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() =>  miss_data_alarm()}
                >

                    <Text style={styles.buttonText}>경로 생성</Text>
                </TouchableOpacity>
                <SettingSvg
                    style={{width:23, height: 24}}
/>
            </View>
        </View>
    );
}
export default DrawTrackRunScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    topbox:{
      width: 348,
      height: 82,
      marginLeft: 23,
      marginTop: 6,
      borderRadius: 16,
      backgroundColor: '#1B1B1B',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 21,
    },
    topboxText: {
      flexDirection: 'column',
    },
    boxTextone: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '900',
      paddingTop: 11,
    },
    boxTexttwo: {
      color: '#ffffff',
      fontSize: 13,
      fontWeight: '200',
      paddingTop: 5,
    },
    boxTextthree: {
      color: '#39FF14',
      fontSize: 11,
      fontWeight: '300',
      textDecorationLine: 'underline',
      paddingTop: 6,
    },
    topline: {
        height: 38,
        backgroundColor: '#141414',
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 16,
        fontWeight: '200',
    },
    more: {
        color: '#39FF14',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 3,
        textDecorationLine: 'underline',
    },
    template:{
        height: 92, //79
        backgroundColor: '#141414',
        paddingTop: 9,
        paddingHorizontal: 17,
        paddingBottom: 0,
        flexDirection: 'row',
    },
    eachtemplate:{
        backgroundColor: '#141414',
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
        pointerEvents: 'none',
    },
    mapsize: {
        width: 330,
        height: 330,
        position: 'absolute',
        top: 8,
        left: -165,
        pointerEvents: 'none',
    },
    map:{
        backgroundColor: '#141414',
        height: 376,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapgreen:{
        width: 333,
        height: 168,
        backgroundColor: 'rgba(57, 255, 20, 0.36)',
        position: 'absolute',
        top: 62,
        left: 32,
        pointerEvents: 'box-none',
    },
    subtitle: {
        color: 'black',
        fontSize: 17,
        fontWeight: '900',
        paddingTop: 27,
        textAlign: 'center',
    },
    kmview:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 5,
    },
    km:{
        color: 'black',
        fontSize: 32,
        fontWeight: '500',
        paddingTop: 10,
        textAlign: 'center',
    },
    sub:{
        color: 'black',
        fontSize: 12,
        fontWeight: '300',
        paddingTop: 40,
        textAlign: 'center',
    },
    buttonview:{
        backgroundColor:'#141414',
        height: 77,
        paddingTop: 9,
        paddingHorizontal: 45,
        paddingBottom: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#39FF14',
        width: 186,
        height: 52,
        borderRadius: 8,
        alignItems: 'center',
        paddingTop: 15,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
    },
});
