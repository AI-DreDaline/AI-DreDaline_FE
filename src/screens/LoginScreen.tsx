import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoingStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<LoingStackParamList, 'Logo'>;

import mainIcon from '../assets/images/mainicon.png';
import phoneicon from '../assets/images/phone.png';
import appleicon from '../assets/images/apple.png';
import navericon from '../assets/images/naver.png';
import googleicon from '../assets/images/google.png';


const LoginScreen = ({ navigation }: Props) => {
    return(
        <View style={styles.container}>
            <Image
                source={mainIcon}
                style={{width: 320, height: 270, marginTop: 120, marginLeft: 40}}
            />
            <View style={styles.buttonview}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PhoneLogin')}
                >
                    <View style={styles.button}>
                        <View style={{width:110, paddingLeft: 50, paddingTop: 13}}>
                            <Image
                                source={phoneicon}
                                style={{width: 18, height: 25}}
                            />
                        </View>
                        <Text style={styles.buttontext}>휴대폰 번호로 계속하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AppleLogin')}
                >
                    <View style={styles.button}>
                        <View style={{width:110, paddingLeft: 50, paddingTop: 13}}>
                            <Image
                                source={appleicon}
                                style={{width: 20, height: 23}}
                            />
                        </View>
                        <Text style={styles.buttontext}>애플 아이디로 계속하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NaverLogin')}
                >
                    <View style={styles.button}>
                        <View style={{width:110, paddingLeft: 50, paddingTop: 13}}>
                            <Image
                                source={navericon}
                                style={{width: 23, height: 23}}
                            />
                        </View>
                        <Text style={styles.buttontext}>네이버 아이디로 계속하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('GoogleLogin')}
                >
                    <View style={styles.button}>
                        <View style={{width:110, paddingLeft: 50, paddingTop: 12}}>
                            <Image
                                source={googleicon}
                                style={{width: 22, height: 26}}
                            />
                        </View>
                        <Text style={styles.buttontext}>구글 아이디로 계속하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.bottomtext}>By signing up or singning in, you agree to our</Text>
            <View style={{flexDirection: 'row', paddingLeft: 95, paddingTop: 7}}>
                <TouchableOpacity
                >
                    <Text style={styles.bottomcolortext}>Terms of Use</Text>
                </TouchableOpacity>
                <Text style={[styles.bottomtext, {paddingLeft: 3, paddingRight: 3}]}>and</Text>
                <TouchableOpacity
                >
                    <Text style={styles.bottomcolortext}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    buttonview: {
        width: '100%',
        height: 305,
        marginTop: 81,
        alignItems: 'center',
    },
    button: {
        width:350,
        height: 52,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginBottom: 18,
        flexDirection: 'row',
    },
    buttontext: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight:'500',
        paddingTop: 14,
        paddingLeft: 7,
    },
    bottomtext: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
    },
    bottomcolortext: {
        color: '#39FF14',
        fontSize: 14,
        fontWeight: '400',
    },
});