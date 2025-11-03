import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import useTabBarVisibility from "../assets/useTabBarVisibility";
import * as Progress from 'react-native-progress';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types'; // 스택 타입 정의

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const LoadingScreen: React.FC<Props> = ({ navigation}) => {
    useTabBarVisibility(false);
    const [loading, setLoading] = useState(true);
    const message = [
        ['AI 경로 생성 시 10~20m 정도의 오차가 발생할 수 있습니다.'],
        ['안전을 위해 횡단보도와 인도를 이용해주시기 바랍니다.'],
    ];

    const [randomMessage, setRandomMessage] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * message.length);
        setRandomMessage(message[randomIndex][0]);
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            navigation.replace('Navigate');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000; // 2초
        const interval = 16; // 약 60fps
        const increment = interval / duration;

        const timer = setInterval(() => {
            start += increment;
            if (start >= 1) {
                start = 1;
                clearInterval(timer);
            }
            setProgress(start);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    /*
    const { address } = route.params; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.replace('MainScreen', { address: address || '기본주소' }); // ✅ 3초 뒤 Main 화면으로 이동
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  */

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.png')} // 이미지 경로에 맞게 수정
                style={styles.image}
            />
            <Text style={styles.fisttext}>경로 생성 중...</Text>
            <Text style={styles.secondtext}>{randomMessage}</Text>
            <View style={{marginTop: 46}}></View>
                {loading && <Progress.Bar progress={progress} height={6} width={200} color="#39FF14" unfilledColor="#FFFFFF" borderWidth={0} />}
            <Text style={styles.thirdtext}>Loading...</Text>
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',     // 가로 중앙
        backgroundColor: '#141414',
        paddingTop: 230,
    },
    image: {
        width: 225,
        height: 225,
    },
    fisttext: {
        fontSize: 15,
        color: '#ffffff',
        marginTop: 9,
        fontWeight: '200',
    },
    secondtext: {
        fontSize: 11,
        marginTop: 10,
        color: '#39FF14',
        fontWeight: '600',
    },
    thirdtext: {
        fontSize: 14,
        color: 'rgba(245, 245, 245, 0.65)',
        marginTop: 10,
    },
});
