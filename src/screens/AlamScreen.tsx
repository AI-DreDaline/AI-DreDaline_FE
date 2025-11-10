import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LoingStackParamList } from '../navigations/types';

import mainicon from '../assets/images/mainicon.png';

type Props = NativeStackScreenProps<LoingStackParamList, 'Alam'>& {
  onLogIn: () => void;
};

const AlamScreen = ({ navigation, onLogIn }: Props) => {
    return(
        <View style={styles.container}>

            <View style={styles.imageview}>
                <Image
                    source={mainicon}
                    style={{width: 315, height: 315}}
                />
            </View>

            <View style={styles.textview}>
                <Text style={styles.title}>알림을 설정할까요?</Text>
            </View>

            <View style={styles.textview}>
                <Text style={styles.texts}>알림을 켜서 중요한 소식과 알림을</Text>
                <Text style={styles.texts}>놓치지 않도록 하세요.</Text>
                <Text style={styles.texts}>나중에 언제든지 끌 수 있습니다.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => onLogIn()}
                >
                    <View style={styles.button_1}>
                        <Text 
                            style={[
                                styles.buttontext_1,
                            ]}
                        >알림</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onLogIn()}           
                >
                    <View style={styles.button_2}>
                        <Text 
                            style={[
                                styles.buttontext_2,
                            ]}
                        >나중에</Text>
                    </View>
                </TouchableOpacity> 
            </View>
        </View>
    );
}
export default AlamScreen;
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    imageview: {
        height: 310,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 155,
    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '800',
        marginTop: 69,
        marginBottom: 13,
    },
    textview: {
        alignItems: 'center'
    },
    texts: {
        color: '#9095A0',
        fontSize: 17,
        fontWeight: '400',
        marginTop: 6,
    },
    buttonContainer: {
        width: '100%',
    },
    button_1: {
        width: 352,
        height: 52,
        backgroundColor: '#39FF14',
        borderRadius: 8,
        marginTop: 34,
        marginHorizontal:22,
    },
    buttontext_1: {
        fontSize: 19,
        color: '#000000',
        fontWeight: '800',
        paddingTop: 15,
        textAlign: 'center',
    },
    button_2: {
        width: 355,
        height: 52,
        borderRadius: 8,
        marginTop: 9,
        marginHorizontal:20,
    },
    buttontext_2: {
        fontSize: 19,
        color: '#9095A0',
        fontWeight: '600',
        paddingTop: 15,
        textAlign: 'center',
    },
});