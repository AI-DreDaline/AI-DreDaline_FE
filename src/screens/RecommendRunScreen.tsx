import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

import runner from '../assets/images/runner.png';
import runner_active from '../assets/images/runner_active.png';
import baseball from '../assets/images/baseball.png';
import baseball_active from '../assets/images/baseball_active.png';
import butterfly from '../assets/images/butterfly.png';
import butterfly_active from '../assets/images/butterfly_active.png';
import duck from '../assets/images/duck.png';
import duck_active from '../assets/images/duck_active.png';
import horse from '../assets/images/horse.png';
import horse_active from '../assets/images/horse_active.png';
import clover from '../assets/images/clover.png';
import clover_active from '../assets/images/clover_active.png';
import round from '../assets/images/round.png';
import map from '../assets/images/map.png';
import plus from '../assets/images/plus.png';
import minus from '../assets/images/minus.png';
import pin from '../assets/images/pin.png';
import graph from '../assets/images/graph.png';
import setting from '../assets/images/setting.png';

type Props = NativeStackScreenProps<RootStackParamList, 'RecommendRun'>;

function RecommendRunScreen({ navigation, route }: Props) {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const templates = [
        { id: 'runner', label: '러닝', img: runner, imgActive: runner_active },
        { id: 'baseball', label: '야구공', img: baseball, imgActive: baseball_active },
        { id: 'butterfly', label: '나비', img: butterfly, imgActive: butterfly_active },
        { id: 'duck', label: '오리', img: duck, imgActive: duck_active },
        { id: 'horse', label: '체스말', img: horse, imgActive: horse_active },
        { id: 'clover', label: '클로버', img: clover, imgActive: clover_active },
    ];

    const [km, setKm] = useState(5.00);
    const { address, mode } = route.params;
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
            <View style={styles.topline}>
                <Text style={styles.title}>모양 선택하기</Text>
                <Text style={styles.more}>더보기</Text>
            </View>
            <View style={styles.template}>
                {templates.map((item) => {
                    const isActive = selectedTemplate === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.eachtemplate}
                            onPress={() =>
                                setSelectedTemplate((prev) =>
                                    prev === item.id ? null : item.id
                                )
                            }
                            activeOpacity={0.7}
                        >
                            <Image
                                source={isActive ? item.imgActive : item.img}
                                style={{
                                    width: isActive ? 65 : 52,
                                    height: isActive ? 65 : 52,
                                }}
                            />
                            <Text
                                style={[
                                    styles.eachtitle,
                                    isActive && { fontWeight: '900' },
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
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
                <View style={styles.mapgreen}>
                    <Text style={styles.subtitle}>오늘의 목표</Text>
                    <View style={[styles.kmview, { zIndex: 10 }]}>
                        <TouchableOpacity onPress={handleMinus}>
                            <Image source={minus} style={{ width: 30, height: 30, marginTop: 9 }} />
                        </TouchableOpacity>
                            <View style={{width: 160}}>
                                <Text style={styles.km}>{km.toFixed(2)} km</Text>
                            </View>
                        <TouchableOpacity onPress={handlePlus}>
                            <Image source={plus} style={{ width: 30, height: 30, marginTop: 9 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sub}>{message}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('RecommendMap')}>
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
                <TouchableOpacity
                    style={styles.button}
                    disabled={!address}
                    onPress={() =>
                        navigation.navigate('MainScreen', { address: address ?? '', mode: 'recommendReady' })
                    }
                >
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
export default RecommendRunScreen;

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
        top: 10,
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
