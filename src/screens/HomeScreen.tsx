import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigations/types';
import { useNavigation } from '@react-navigation/native';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

import small_rightarrow from '../assets/images/small_rightarrow.png';
import fire from '../assets/images/fire.png';
import map_ready from '../assets/images/map_ready.png';
import rank_1 from '../assets/images/rank_1.png';
import rank_2 from '../assets/images/rank_2.png';
import rank_3 from '../assets/images/rank_3.png';
import rank_view from '../assets/images/rank_view.png';
import run_alam from '../assets/images/run_alam.png';
import right_arrow from '../assets/images/right_arrow.png';

import Modal_short from '../components/Modal_short';

const rankImages: { [key: string]: any } = {
  rank_1,
  rank_2,
  rank_3,
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  
  const rank = [
    ['rank_1', '네잎클로버런', 1.5],
    ['rank_2', '네잎클로버런', 1.5],
    ['rank_3', '네잎클로버런', 1.5],
  ];

  const recent = [
    ['런런', '서울시 세종로 1-88', 8, '중'],
    ['런런', '서울시 세종로 1-88', 8, '중'],
  ];

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topbox}>
          <View>
            <Text style={styles.topboxtext_1}>나만의 경로를 공유하고</Text>
            <Text style={styles.topboxtext_2}>친구, 가족, 연인과 같이 뛰어보세요</Text>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
              <Text style={styles.topboxtext_3}>나만의 경로 공유하러 가기</Text>
              <Image
                source={small_rightarrow}
                style={{width: 4, height: 5, marginTop: 9.4, marginLeft: 10}}
              />
            </View>
          </View>
          <Image
            source={fire}
            style={{width: 51, height: 64, marginTop: 10, marginLeft: 70}}
          />
        </View>

        <View style={styles.toptitleview}>
          <Text style={styles.toptitle}>오늘의 ART TOP 5</Text>
          <Text style={styles.toptext}>둘러보기</Text>
        </View>

        <View style={styles.Rankview}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {rank.map((item, index) => (
              <View key={index} style={styles.Rank}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                >
                  {/* 배경 이미지 */}
                  <Image
                    source={map_ready}
                    style={{ width: 132, height: 174, borderRadius: 4 }}
                  />

                  {/* 랭크 이미지 */}
                  <Image
                    source={rankImages[item[0]]} // rank_1, rank_2 등
                    style={{
                      width: 35,
                      height: 47,
                      position: 'absolute',
                      top: 9,
                      left: 3,
                    }}
                  />

                  {/* 랭크 이름 */}
                  <Text style={styles.Ranktitle}>{item[1]}</Text>

                  {/* 뷰 아이콘 */}
                  <Image
                    source={rank_view}
                    style={{
                      width: 8,
                      height: 8,
                      position: 'absolute',
                      bottom: 8.3,
                      left: 7,
                    }}
                  />

                  {/* 뷰 수 */}
                  <Text style={styles.Rankviewtext}>{item[2]}M views</Text>
                </TouchableOpacity>
              </View>
            ))}

          </ScrollView>
        </View>

        <View style={styles.medtitleview}>
          <Text style={styles.medtitle}>근처에서 달려볼까요?</Text>
          <Text style={styles.medtext}>둘러보기</Text>
        </View>

        <View style={styles.recentview}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recent.map((item, index) => (
              <View key={index} style={styles.recentbox}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={map_ready}
                    style={{
                      width: 213,
                      height: 166, 
                      borderTopLeftRadius: 12,  // 왼쪽 위 둥글게
                      borderTopRightRadius: 12,
                    }}
                  />
                  <Text style={styles.recenttitle}>{item[0]}</Text>
                  <Text style={styles.recentaddress}>{item[1]}</Text>
                  <View style={{flexDirection:'row', justifyContent: 'space-between', paddingHorizontal: 8}}>
                    <Text style={styles.recentkm}>{item[2]}km</Text>
                    <Text style={styles.recentleve}>난의도 {item[3]}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.medtitleview}>
          <Text style={styles.bottomtitle}>러닝 소식</Text>
        </View>

        <View style={styles.runningview}>
          <View style={styles.runningbox}>
            <Image
              source={run_alam}
              style={{
                width: 350,
                height: 196,
                borderRadius: 6,
              }}
            />
            <TouchableOpacity
              style={styles.nextbutton}
            >
              <View style={{ paddingTop: 10, paddingLeft: 10 }}>
                <Image source={right_arrow} style={{ width: 18, height: 18 }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <Modal_short 
            title='경로 세부사항'
            closeModal={() => setModalVisible(false)}
            navigation={navigation}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // 배경색 어둡게
  },
  topbox: {
    width: 348,
    height: 85,
    marginTop: 66,
    marginLeft: 23,
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    paddingLeft: 20,
    flexDirection:'row',
  },
  topboxtext_1:{
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    paddingTop: 13,
  },
  topboxtext_2:{
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '400',
    paddingTop: 5,
  },
  topboxtext_3:{
    color: '#39FF14',
    fontSize: 11,
    fontWeight: '500',
    paddingTop: 5,
    textDecorationLine: 'underline',
  },
  toptitleview: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
  },
  toptitle: {
    paddingTop: 27,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  toptext: {
    color: '#39FF14',
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 32,
    textDecorationLine: 'underline',
  },
  Rankview: {
    marginLeft: 23,
    width: '100%',
    height: 190,
    flexDirection: 'row',
  },
  Rank: {
    width: 132,
    height: 174,
    borderRadius: 4,
    marginRight: 15,
  },
  Ranktitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    position: 'absolute',
    bottom: 24,     // 위쪽에서 10만큼
    left: 7,
  },
  Rankviewtext: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '400',
    position: 'absolute',
    bottom: 8,     // 위쪽에서 10만큼
    left: 20,
  },
  medtitleview: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
  },
  medtitle: {
    paddingTop: 9,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  medtext: {
    color: '#39FF14',
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 16,
    textDecorationLine: 'underline',
  },
  recentview :{
    marginLeft: 23,
    width: '100%',
    height: 240,
  },
  recentbox: {
    width: 213,
    height: 234,
    borderRadius: 10,
    backgroundColor: '#1B1B1B',
    marginRight: 15,
  },
  recenttitle: {
    color: '#ffffff',
    fontSize: 15,
    paddingTop: 6,
    paddingLeft: 8,
    fontWeight: '700',
  },
  recentaddress: {
    color: '#BCC1CA',
    fontSize: 12,
    paddingTop: 6,
    paddingLeft: 8,
    fontWeight: '500',
  },
  recentkm: {
    color: '#39FF14',
    fontSize: 12,
    paddingTop: 6,
    fontWeight: '700',
  },
  recentleve: {
    color: '#ffffff',
    fontSize: 12,
    paddingTop: 5,
    fontWeight: '500',
  },
  bottomtitle: {
    paddingTop: 9,
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  runningview: {
    width: '100%',
    height: 230,
    
  },
  runningbox: {
    width: 350,
    height: 196,
    borderRadius: 6,
    backgroundColor: '#171A1F',
    marginLeft: 23,
    marginTop: 1,
  },
  nextbutton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    position: 'absolute',
    bottom: 80,     // 위쪽에서 10만큼
    right: 18,
    backgroundColor: '#ffffff',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end', // 화면 하단에 붙게
    backgroundColor: 'rgba(0,0,0,0.4)', // 살짝 어둡게
  },
});
