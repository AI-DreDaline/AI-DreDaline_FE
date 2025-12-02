import {useState} from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';
import {WithLocalSvg} from 'react-native-svg/css';

const runner = require('../assets/images/runner.svg');
const runner_active = require('../assets/images/runner_active.svg');
const baseball = require('../assets/images/baseball.svg');
const baseball_active = require('../assets/images/baseball_active.svg');
const butterfly = require('../assets/images/butterfly.svg');
const butterfly_active = require('../assets/images/butterfly_active.svg');
const duck = require('../assets/images/duck.svg');
const duck_active = require('../assets/images/duck_active.svg');
const horse = require('../assets/images/horse.svg');
const horse_active = require('../assets/images/horse_active.svg');
const clover = require('../assets/images/clover.svg');
const clover_active = require('../assets/images/clover_active.svg');

const round = require('../assets/images/round.svg');
const map = require('../assets/images/map.svg');
const plus = require('../assets/images/plus.svg');
const minus = require('../assets/images/minus.svg');
const pin = require('../assets/images/pin.svg');
const graph = require('../assets/images/graph.svg');
const setting = require('../assets/images/setting.svg');

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
            console.log('RecommendRunScreen 주소:', address);
            setMessage('시작 위치가 설정되었습니다');
        }
    }, [address]);

    const handleMinus = () => {
        setKm(prev => Math.max(0, parseFloat((prev - 0.5).toFixed(2))));
        // 0 밑으로 안내려가게
    };

    const handlePlus = () => {
        setKm(prev => parseFloat((prev + 0.5).toFixed(2)));
    };

    const miss_data_alert = () => {
        Alert.alert(
            "경로 설정을 위해 시작점을 입력해주세요.",
        );
    };

    const Make_route_EVENT = (dataaddress, datakm:number) => { 
        console.log("경로 생성 버튼 클릭", dataaddress,datakm);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topline}>
                <Text style={styles.title}>모양 선택하기</Text>
                <Text style={styles.more}>더보기</Text>
            </View>

            <View style={styles.template}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                                <WithLocalSvg
                                    key={item.id}
                                    asset={isActive ? item.imgActive : item.img}
                                    width={isActive ? 65 : 52}
                                    height={isActive ? 65 : 52}
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
                </ScrollView>
            </View>

            <View style={styles.map}>
                <TouchableOpacity onPress={() => navigation.navigate('RecommendMap')}>
                    <WithLocalSvg
                        asset={map}
                        style={styles.mapsize}
                    />
                </TouchableOpacity>
                <WithLocalSvg
                    asset={pin}
                    style={{
                        width:26,
                        height:26,
                        position: 'absolute',
                        top: 275,
                        left: 185,
                    }}
                />
                <View style={styles.mapgreen}>
                    <Text style={styles.subtitle}>오늘의 목표</Text>
                    <View style={[styles.kmview, { zIndex: 10 }]}>
                        <TouchableOpacity onPress={handleMinus}>
                            <WithLocalSvg asset={minus} style={{ width: 30, height: 30, marginTop: 9 }} />
                        </TouchableOpacity>
                            <View style={{width: 160}}>
                                <Text style={styles.km}>{km.toFixed(2)} km</Text>
                            </View>
                        <TouchableOpacity onPress={handlePlus}>
                            <WithLocalSvg asset={plus} style={{ width: 30, height: 30, marginTop: 9 }} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sub}>{message}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('RecommendMap')}>
                    <WithLocalSvg
                        asset={round}
                        style={{
                            width: 350,
                            height: 350,
                            position: 'absolute',
                            top: -339,
                            left: -174,
                        }}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonview}>
                <WithLocalSvg
                    asset={graph}
                    style={{width:20, height: 25}}
                />
                <TouchableOpacity
                    style={styles.button}
                    //disabled={!address}
                    onPress={() => {
                        const invalidAddresses = [
                            '',
                            '위치를 불러오는 중...',
                            '주소를 불러올 수 없습니다.',
                            '주소를 불러오는 중 오류가 발생했습니다.'
                        ];

                        if (!address || invalidAddresses.includes(address)) {
                            miss_data_alert();
                        } else {
                            Make_route_EVENT(address,km);
                            navigation.navigate('MainScreen', {
                                address: address,
                                mode: 'recommendReady'
                            });
                        }
                    }}
                >
                    <Text style={styles.buttonText}>경로 생성</Text>
                </TouchableOpacity>
                <WithLocalSvg
                    asset={setting}
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
        paddingLeft: 13,
    },
    eachtitle: {
        paddingTop: 3,
        color: '#ffffff',
        fontSize: 12,
    },
    mapsize: {
        width: 330,
        height: 330,
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
