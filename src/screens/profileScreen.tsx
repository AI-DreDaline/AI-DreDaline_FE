import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoingStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<LoingStackParamList, 'Profile'>;

const ProfileScreen = ({ navigation }: Props) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.topview}>
                <View style={[styles.pageview, {backgroundColor: '#39FF14'}]} />
                <View style={[styles.pageview, {backgroundColor: '#F1F2FD'}]} />
                <View style={[styles.pageview, {backgroundColor: '#F1F2FD'}]} />
                <View style={[styles.pageview, {backgroundColor: '#F1F2FD'}]} />
            </View>

            <View style={styles.titleview}>
                <Text style={styles.title}>간단한 프로필을 등록하세요</Text>
            </View>

            <View style={styles.listview}>
                <Text style={styles.text}>이름</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="이름을 입력하세요"
                    placeholderTextColor="#6E6E6E"
                />
            </View>
            <View style={styles.listview}>
                <Text style={styles.text}>성별</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="남/여로 입력하세요"
                    placeholderTextColor="#6E6E6E"
                />
            </View>
            <View style={styles.listview}>
                <Text style={styles.text}>성별</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="년/월/일"
                    placeholderTextColor="#6E6E6E"
                />
            </View>

            <View style={{height: 43}} />

            <View style={styles.listview}>
                <Text style={styles.text}>키(cm)</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="키를 입력하세요"
                    placeholderTextColor="#6E6E6E"
                    keyboardType="number-pad"
                />
            </View>
            <View style={styles.listview}>
                <Text style={styles.text}>몸무게(kg)</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="몸무게 입력하세요"
                    placeholderTextColor="#6E6E6E"
                    keyboardType="number-pad"
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ConnectHealth')}
            >
                <Text style={styles.buttontext}>계속</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button_2}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.button_2text}>나중에</Text>
            </TouchableOpacity>
        </View>
    );
}
export default ProfileScreen;

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
    titleview: {
        height: 86,
        paddingLeft: 20,
        paddingTop: 30,
    },
    title: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '900'
    },
    listview: {
        height: 94,
        marginHorizontal: 20,
    },
    text: {
        color: '#F5F5F5',
        fontSize: 13,
        fontWeight: '400'
    },
    textinput: {
        width: 352,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        marginTop: 10,
        fontSize: 17,
        color: '#141414',
        fontWeight: '300',
        paddingLeft: 15,
    },
    button: {
        width: 350,
        height: 52,
        backgroundColor: '#39FF14',
        borderRadius: 8,
        marginLeft: 20,
        marginTop: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttontext: {
        textAlign: 'center',
        fontSize: 19,
        color: '#141414',
        fontWeight: '800',
    },
    button_2: {
        //backgroundColor: 'red',
        width: 350,
        height: 52,
        marginLeft: 20,
        marginTop: 10,
        borderRadius: 8,
        alignItems:'center',
        justifyContent: 'center'
    },
    button_2text: {
        textAlign: 'center',
        color: '#9095A0',
        fontSize: 18,
        fontWeight: '500',
    }

});