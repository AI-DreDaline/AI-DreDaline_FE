import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

import round from '../assets/images/round.png';
import map from '../assets/images/map.png';
import pin from '../assets/images/pin.png';
import graph from '../assets/images/graph.png';
import setting from '../assets/images/setting.png';
import flag from '../assets/images/flag.png'

type Props = NativeStackScreenProps<RootStackParamList, 'DrawTrackRun'>;

function DrawTrackRunScreen({ navigation, route }: Props) {

    const [km, setKm] = useState(5.00);
    const address = route.params?.address;
    const [message, setMessage] = React.useState(
        '지도를 터치해 시작 위치를 선택할 수 있습니다'
    );

    React.useEffect(() => {
        if (address) {
        setMessage('시작 위치가 설정되었습니다');
        }
    }, [address]);

    const handleMinus = () => {
        setKm(prev => Math.max(0, parseFloat((prev - 0.25).toFixed(2)))); // 0 밑으로 안내려가게
    };

    const handlePlus = () => {
        setKm(prev => parseFloat((prev + 0.25).toFixed(2)));
    };

    return (
        <View style={styles.container}>
          <View style={styles.topbox}>
            <View>
              <Text style={styles.boxTextone}>처음이신가요?</Text>
              <Text style={styles.boxTexttwo}>나만의 경로 그리기가 처음이라면</Text>
              <Text style={styles.boxTextthree}>튜토리얼 보러가기 {'>'}</Text>
            </View>
            <Image
              source={flag}
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
                        source={map}
                        style={styles.mapsize}
                    />
                </TouchableOpacity>
                <Image
                    source={pin}
                    style={{
                        width:26,
                        height:26,
                        position: 'absolute',
                        top: 325,
                        left: 195,
                    }}
                />
                
                <TouchableOpacity onPress={() => navigation.navigate('DrawTrackMap')}>
                    <Image
                        source={round}
                        style={styles.round}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonview}>
                <Image
                    source={graph}
                    style={{width:20, height: 25}}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Loading')}>
                    <Text style={styles.buttonText}>경로 생성</Text>
                </TouchableOpacity>
                <Image
                    source={setting}
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
        top: -5,
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
