import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoingStackParamList } from '../navigations/types';
import {WithLocalSvg} from 'react-native-svg/css';

const Fitenssicon = require('../assets/images/fitenss.svg');

type Props = NativeStackScreenProps<LoingStackParamList, 'ConnectFitenss'>;

const ConnectFitenssScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topview}>
                <View style={[styles.pageview, {backgroundColor: '#F1F2FD'}]} />
                <View style={[styles.pageview, {backgroundColor: '#F1F2FD'}]} />
                <View style={[styles.pageview, {backgroundColor: '#F1F2FD'}]} />
                <View style={[styles.pageview, {backgroundColor: '#39FF14'}]} />
            </View>

            <View style={styles.mainview}>
                <WithLocalSvg
                    asset={Fitenssicon}
                    style={{width: 40, height: 40, borderRadius: 10}}
                />
                <Text style={styles.maintext}>피트니스</Text>
            </View>

            <View style={{alignItems: 'center',}}>
                <Text style={styles.texts}>운동을 기록하려면 모션서비스가 필요합니다.</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Alam')}
            >
                <Text style={styles.buttontext}>계속</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ConnectFitenssScreen;
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    topview: {
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 74,
        marginHorizontal: 20,
    },
    pageview: {
        width: 84,
        height: 5,
        borderRadius: 3,
    },
    mainview: {
        height: 98,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 280,
        paddingHorizontal: 110,
    },
    maintext: {
        color: '#fff',
        fontSize: 34,
        fontWeight: '600',
        paddingTop: 3,
    },
    texts: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '400',
        marginTop: 16,
    },
    button: {
        width: 350,
        height: 52,
        backgroundColor: '#39FF14',
        borderRadius: 8,
        marginLeft: 20,
        marginTop: 230,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttontext: {
        textAlign: 'center',
        fontSize: 19,
        color: '#141414',
        fontWeight: '800',
    },
});