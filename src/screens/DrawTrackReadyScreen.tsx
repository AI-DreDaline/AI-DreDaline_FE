import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

import RunSvg from '../assets/images/run.svg';
import GraphSvg from '../assets/images/graph.svg';
import SettingSvg from '../assets/images/setting.svg';

import Modal_short from '../components/Modal_short';

function DrawTrackReadyScreen({navigation}: NativeStackScreenProps<RootStackParamList, 'DrawTrackReady'>) {
    const km = 5.13

    const today = new Date();
    const formattedToday = 
        `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

    const [title, setTitle] = useState(`무제1_${formattedToday}`);

    const [visible, setVisible] = useState(false);

    const Make_navigate_EVENT = () => {
        console.log("네비게이트 생성 이벤트 실행");
    }
      
        return (
            <View style={styles.container}>
                <View style={styles.topline}>
                    <RunSvg
                        width={35}
                        height={35}
/>
                    <TextInput
                        style={styles.toptext}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="제목을 입력하세요"
                        placeholderTextColor="#aaa"
                    />
                </View>
                <View style={styles.runview}>
                    <TouchableOpacity
                        onPress={() => setVisible(true)}
                    >
                        <View style={styles.runbox}>
                            <Image
                                source={require('../assets/images/map_ready.png')}
                                style={{ width: 333, height: 355 }}
                                resizeMode="cover"
                            />
                            <View style={styles.runtextview}>
                                <Text style={styles.runtextone}>{km}km</Text>
                                <Text style={styles.runtexttwo}>address</Text>
                                <Text style={styles.runtextthree}>예상 난의도: 중</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
              
                <View style={styles.buttonview}>
                    <View>
                        <TouchableOpacity >
                            <GraphSvg
                                style={{width:20, height: 25}}
/>
                        </TouchableOpacity>
                                      
                        <Modal visible={visible} animationType="slide" transparent>
                            <View style={styles.overlay}>
                                <Modal_short 
                                    title={title}
                                    closeModal={() => setVisible(false)}
                                    navigation={navigation}
                                />
                            </View>
                        </Modal>  
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{Make_navigate_EVENT(),navigation.navigate('Loading')}}
                    >
                        <Text style={styles.buttonText}>안내 시작</Text>
                    </TouchableOpacity>
                    <SettingSvg
                        style={{width:23, height: 24}}
/>
                </View>
            </View>
        );
};
  
  export default DrawTrackReadyScreen;
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    topline: {
        flexDirection: 'row',
        paddingLeft: 29,
        backgroundColor: '#141414',
        marginTop: 7,
        alignItems: 'center',
    },
    toptext: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 15,
        fontWeight: '600',
        paddingLeft: 8,
        textDecorationLine: 'underline',
    },
    runview: {
        backgroundColor: '#141414',
        height: 460,
    },
    runbox: {
        backgroundColor: '#1B1B1B',
        borderRadius: 10,
        width: 333,
        height: 430,
        marginTop: 10,
        marginLeft: 29,
        overflow: 'hidden',
    },
    runtextview:{
        paddingLeft: 20,
    },
    runtextone: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
        paddingTop: 7,
    },
    runtexttwo: {
        fontSize: 15,
        fontWeight: '300',
        color: '#ffffff',
        paddingTop: 3,
    },
    runtextthree: {
        fontSize: 12,
        fontWeight: '500',
        color: '#39FF14',
        paddingTop: 4,
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
    overlay: {
        flex: 1,
        justifyContent: 'flex-end', // 화면 하단에 붙게
        backgroundColor: 'rgba(0,0,0,0.4)', // 살짝 어둡게
    },
  });
  