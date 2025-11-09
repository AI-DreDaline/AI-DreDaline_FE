import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LoingStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<LoingStackParamList, 'AppleLogin'>;

import back from '../assets/images/back.png';


const AppleLoginScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topscreen}>
                <View style={styles.topview}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()} // 뒤로가기
                    >
                        <Image 
                            source={back}
                            style={{width: 11, height:18}}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.hr}/>
            
            <View style={styles.titleview}>
                <Text style={styles.title}>Apple 계정으로 로그인</Text>
                <View style={styles.title_2view}>
                    <Text style={styles.title_2}>Apple 아이디와 비밀번호로 간편하게 로그인하고,</Text>
                    <Text style={styles.title_2}>정보를 안전하게 관리하세요.</Text>
                </View>
            </View>

            <View style={styles.listview}>
                <Text style={styles.text}>아이디</Text>
                <TextInput
                    style={styles.input}
                    placeholder="@icloud.com"
                    //value={ID}
                    placeholderTextColor="#BCC1CA"
                    keyboardType="number-pad"
                />
            </View>
            <View style={styles.listview}>
                <Text style={styles.text}>비밀번호</Text>
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    //value={PW}
                    placeholderTextColor="#BCC1CA"
                    keyboardType="number-pad"
                />
            </View>

            <View style={{
                width: '100%',
                alignItems: 'center',
                height: 60,
                marginTop: 280}}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text style={styles.buttontext}>로그인 / 회원가입</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
export default AppleLoginScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#141414',
    },
    topscreen: { 
        height: 120,
        backgroundColor: "#1B1B1B",
    },
    backButton: {
        marginLeft: 24,
        marginTop: 3,
    },
    topview: {
        backgroundColor: '#1B1B1B',
        flexDirection: 'row',
        marginTop: 69,
        height: 30,
    },
    hr: {
        height: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
    titleview: {
        height: 135,
        paddingHorizontal: 20,
        paddingTop: 27,
    },
    title :{
        color: '#fff',
        fontSize: 21,
        fontWeight: '700',
        paddingBottom: 19,
    },
    title_2view: {
        width: 355,
    },
    title_2: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 7,
        color: '#9095A0',
    },
    listview: {
        //backgroundColor: 'blue',
        height: 95,
        marginHorizontal: 20,
    },
    text: {
        color: '#F5F5F5',
        fontSize: 13,
        fontWeight: '400'
    },
    input: {
        width: '100%',
        height: 51,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 10,
        marginRight: 43,
        borderRadius: 4,
        paddingLeft: 18,
        fontSize: 18,
        color: '#fff',
    },
    button: {
        backgroundColor: '#39FF14',
        width: 350,
        height: 52,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttontext: {
        color: '#141414',
        fontSize: 19,
        fontWeight: '500',
    }
});