import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LoingStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<LoingStackParamList, 'PhoneVerfy'>;

import back from '../assets/images/back.png';

const PhoneVerfyScreen = ({ navigation }: Props) => {
    const [secondsLeft, setSecondsLeft] = useState(5 * 60); // 5분 = 300초

    useEffect(() => {
        const interval = setInterval(() => {
        setSecondsLeft(prev => {
            if (prev <= 0) {
            clearInterval(interval);
            return 0;
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
    }, []);

    // 분:초 형태로 변환
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputsRef = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (/^\d$/.test(text)) { // 숫자 한 글자만 허용
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            // 다음 입력칸으로 포커스 이동
            if (index < 6 - 1) {
                inputsRef.current[index + 1].focus();
            }
            else if (text === '') {
                // 지우는 경우
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };

    const handleKeyPress = ({ nativeEvent }: any, index: number) => {
        if (nativeEvent.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = ''; // 현재 칸 비우기
            setOtp(newOtp);

            if (index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const handleSubmit = () => {
    // 완료 버튼 누르면 다음 페이지로 이동
        navigation.navigate('Profile'); // 이동할 화면 이름
    };

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
                <Text style={styles.title}>6자리 인증코드</Text>
                <View style={styles.title_2view}>
                    <Text style={styles.title_2}>인증번호가 발송된 문자를 못 받으셨나요?</Text>
                </View>
            </View>

            <View style={styles.phoneview}>
                {otp.map((digit, index) => {
                    const hasValue = digit !== '';
                    return (
                        <TextInput
                            key={index}
                            ref={(ref) => { inputsRef.current[index] = ref! }}
                            style={[
                                styles.input,
                                hasValue
                                ? {
                                    borderColor: '#39FF14',
                                    shadowColor: '#39FF14',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    elevation: 3,
                                }
                                : { borderColor: '#BCC1CA', shadowOpacity: 0, elevation: 0 },
                            ]}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            returnKeyType="done"       // 키보드 완료 버튼 표시
                            onSubmitEditing={handleSubmit} 
                        />
                    );
                })}
            </View>

            <Text style={styles.timetext}>인증 번호가 {formattedTime}후에 만료됩니다.</Text>

            <TouchableOpacity
                style={{
                    width: 60,
                    height: 23,
                    marginLeft: 20,
                    marginTop: 27,
                }}
                
            >
                <Text style={styles.returntext}>재전송</Text>
            </TouchableOpacity>
        </View>
    );
}
export default PhoneVerfyScreen;

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
        height: 113,
        paddingHorizontal: 20,
        paddingTop: 27,
    },
    title :{
        color: '#fff',
        fontSize: 21,
        fontWeight: '700',
        paddingBottom: 18,
    },
    title_2view: {
        width: 290,
    },
    title_2: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 7,
        color: '#9095A0',
    },
    phoneview: {
        height: 81,
        width: '100%',
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        borderWidth: 1,
        fontSize: 21,
        textAlign: 'center',
        width: 39,
        height: 42,
        borderRadius: 4,
        color: '#39FF14',
        fontWeight: '400',
        backgroundColor: '#141414',
    },
    timetext: {
        color: '#9095A0',
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 20,
    },
    returntext: {
        color: '#39FF14',
        fontSize: 19,
        fontWeight: '500',
    }
});