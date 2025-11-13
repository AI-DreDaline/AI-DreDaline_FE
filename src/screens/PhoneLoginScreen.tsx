import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoingStackParamList } from '../navigations/types';
import {WithLocalSvg} from 'react-native-svg/css';

const back = require('../assets/images/back.svg');
const down_arrow = require('../assets/images/down_arrow.svg');

type Props = NativeStackScreenProps<LoingStackParamList, 'PhoneLogin'>;

const PhoneLoginScreen = ({ navigation }: Props) => {
    const phone = '';
    const [isOpen, setIsOpen] = useState(false); // 메뉴 열림/닫힘 상태
    const [selected, setSelected] = useState<string>('+82'); // 선택된 항목

    const menuItems = ['+ 82', '+ 02', '+ 01', '+ 03'];

    const toggleMenu = () => setIsOpen(!isOpen);

    const selectItem = (item: string) => {
        setSelected(item);
        setIsOpen(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.topscreen}>
                <View style={styles.topview}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <WithLocalSvg
                            asset={back}
                            style={{width: 11, height:18}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.hr}/>

            <View style={styles.titleview}>
                <Text style={styles.title}>휴대폰 번호 입력</Text>
                <View style={styles.title_2view}>
                    <Text style={styles.title_2}>해당 전화번호로 인증 코드를 전송하고</Text>
                    <Text style={styles.title_2}>저장할 수 있습니다.</Text>
                </View>
            </View>

            <View style={styles.phoneview}>
                <TouchableOpacity
                    style={styles.code}
                    onPress={toggleMenu}
                >
                    <View style={styles.countrynumview}>
                        <Text style={styles.countrynumtext}>{selected}</Text>
                        <WithLocalSvg
                            asset={down_arrow}
                            style={{width: 20, height: 20}}
                        />
                    </View>
                </TouchableOpacity>

                <TextInput
                    style={styles.phoneinput}
                    placeholder="전화번호"
                    value={phone}
                    placeholderTextColor="#BCC1CA"
                    keyboardType="number-pad"
                />
            </View>

            <View style={{height: 100}}>
                {isOpen && (
                    <View style={styles.menu}>
                        {menuItems.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={styles.menuItem}
                                onPress={() => selectItem(item)}
                            >
                                <Text style={styles.menutext}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {/*<View style={styles.loginview}>
                <Text style={styles.medtext}>이미 계정이 있으신가요?</Text>
                <TouchableOpacity
                    style={{paddingLeft: 20}}
                >
                    <Text style={styles.logintext}>로그인</Text>
                </TouchableOpacity>
            </View>
            */}

            <View style={{
                width: '100%',
                alignItems: 'center',
                height: 60,
                marginTop: 45}}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PhoneVerfy')}
                >
                    <Text style={styles.buttontext}>로그인 / 회원가입</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
export default PhoneLoginScreen;

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
        width: 260,
    },
    title_2: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 7,
        color: '#9095A0',
    },
    phoneview: {
        //backgroundColor: 'blue',
        height: 53,
        width: '100%',
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    code: { 
        height: 51,
        width: 102,
        borderRadius: 4,
        borderColor: '#F5F5F5',
        borderWidth: 1,
    },
    input: {
        flex: 1,
        height: 40
    },
    countrynumview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 18,
    },
    countrynumtext: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    menu: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 4,
        marginTop: 3,
        backgroundColor: '#1B1B1B',
        overflow: 'hidden',
        width: 102,
        marginLeft: 20,
        zIndex: 10
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menutext: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
    },
    phoneinput: {
        width: 230,
        height: 51,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: 43,
        borderRadius: 4,
        paddingLeft: 18,
        fontSize: 18,
        color: '#fff'
    },
    loginview: {
        width: '100%',
        flexDirection:'row',
        paddingLeft: 20,
        alignItems: 'center',
    },
    medtext: {
        color: '#9095A0',
        fontSize: 18,
        fontWeight: '400',
    },
    logintext: {
        color: '#39FF14',
        fontSize: 19,
        fontWeight: '600',
        textDecorationLine: 'underline',
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