import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoingStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<LoingStackParamList, 'Logo'>;

import mainIcon from '../assets/images/main.png';

const LoginScreen = ({ navigation }: Props) => {
    return(
        <View style={styles.container}>
            <Image
                source={mainIcon}
                style={{width: 290, height: 270, marginTop: 120, marginLeft: 47}}
            />
            <View style={styles.buttonview}>
                <TouchableOpacity
                >
                    <View style={styles.button}>
                        <View style={{width:110}}>
                            <Image
                            />
                        </View>
                        <Text style={styles.buttontext}>휴대폰 번호로 계속하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                >
                    <View style={styles.button}>
                        <View style={{width:110}}>
                            <Image
                            />
                        </View>
                        <Text style={styles.buttontext}>애플 아이디로 계속하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                >
                    <View style={styles.button}>
                        <View style={{width:110}}>
                            <Image
                            />
                        </View>
                        <Text style={styles.buttontext}>네이버 아이디로 계속하기</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                >
                    <View style={styles.button}>
                        <View style={{width:110}}>
                            <Image
                            />
                        </View>
                        <Text style={styles.buttontext}>구글 아이디로 계속하기</Text>
                    </View>
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
        height: 308,
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
});