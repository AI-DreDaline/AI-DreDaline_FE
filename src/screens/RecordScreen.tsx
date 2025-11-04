import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import run from '../assets/images/run.png';
import left_allow from '../assets/images/left_allow.png';
import right_allow from '../assets/images/right_allow.png';
import map_ready from '../assets/images/map_ready.png'

export default function RecordScreen() {
  const runingcollection_info = [
    [5.15, '제주시 혜안동'],
    [5.15, '제주시 혜안동'],
    [5.15, '제주시 혜안동'],
  ];

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // getMonth()는 0~11 반환

  // 📅 달력용 날짜 배열 생성 함수
  const generateCalendarDays = (year: number, month: number) => {
    // month: 1~12로 받는다고 가정 (Date 객체는 0~11)
    const firstDay = new Date(year, month - 1, 1); // 이번 달 1일
    const lastDay = new Date(year, month, 0); // 이번 달 마지막 날

    const firstDayOfWeek = firstDay.getDay(); // 0=일, 1=월, ..., 6=토
    const prevMonthLastDate = new Date(year, month - 1, 0).getDate();
    const daysInMonth = lastDay.getDate();

    const calendarDays = [];

    // 🔹 (1) 이전 달에서 채워야 할 부분
    // 월요일 시작 기준으로 바꾸려면 일요일(0)을 7로 처리
    const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    for (let i = startOffset; i > 0; i--) {
      calendarDays.push({
        date: new Date(year, month - 2, prevMonthLastDate - i + 1),
        currentMonth: false,
      });
    }

    // 🔹 (2) 이번 달 날짜
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: new Date(year, month - 1, i),
        currentMonth: true,
      });
    }

    // 🔹 (3) 다음 달 채우기 (필요할 때만)
  const remainder = calendarDays.length % 7;
  if (remainder !== 0) {
    const nextMonthDays = 7 - remainder;
    for (let i = 1; i <= nextMonthDays; i++) {
      calendarDays.push({
        date: new Date(year, month, i),
        currentMonth: false,
      });
    }
  }

    return calendarDays;
  };

  const days = generateCalendarDays(year, month);

  const highlightedDates = [
    '2025-11-01',
    '2025-11-03',
    '2025-11-04',
    '2025-11-05',
    '2025-11-07',
    '2025-11-08',
    '2025-11-09',
    '2025-11-11',
    '2025-11-13',
    '2025-11-14',
    '2025-11-16',
    '2025-11-17',
    '2025-11-19',
    '2025-11-21',
    '2025-11-22',
    '2025-11-25',
    '2025-11-26',
    '2025-11-27',
    '2025-11-28',
  ];

  return (
    <View style={styles.container}>

      <View style={styles.topboxview}>
        <View style={styles.titleboxview}>
          <Image
            source={run}
            style={{width: 30, height: 30, marginLeft: 110,}}
          />
          <Text style={styles.title}>나의 기록</Text>
        </View>
        <Text style={styles.toptext}>지난 28일중 15일 러닝하셨네요!</Text>
      </View>

      <View style={styles.calendarboxview}>
        <View style={styles.calendartopview}>
          <Text style={styles.calendarmonthtitle}>{month}월 러닝 요약</Text>
          <View style={styles.calendarallowview}>
            <Image
              source={left_allow}
              style={{width: 16, height: 16}}
            />
            <Image
              source={right_allow}
              style={{width: 16, height: 16}}
            />
          </View>
        </View>

        <View
          style={[styles.calendarseparator, { marginTop: 18 }]}
        />
        <View style={styles.calendarmonthview}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <View key={index} style={styles.calendarDayHeader}>
              <Text style={styles.calendarmonth}>{day}</Text>
            </View>
          ))}
        </View>
        <View
          style={[styles.calendarseparator, { marginBottom: 7 }]}
        />

        {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
          <View
            key={weekIndex}
            style={styles.calendardayview}
          >
            {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((d, index) => {
              const day = d.date.getDate(); // 숫자 일자 추출
              const isCurrent = d.currentMonth;

              // 날짜 비교용 문자열 (YYYY-MM-DD 형식)
              const dateString = `${d.date.getFullYear()}-${String(
                d.date.getMonth() + 1
              ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

              // 강조할 날짜인지 확인
              const isHighlighted = highlightedDates.includes(dateString);

              return (
                <View 
                  key={index} 
                  style={
                    styles.calendardayeachview
                  }
                >
                  <View style={isHighlighted && styles.highlightedDay}>
                    <Text 
                      style={{ 
                        color: isHighlighted
                          ? 'black' // ✅ 하이라이트된 날짜 → 검정색
                          : isCurrent
                          ? 'white' // ✅ 이번 달 날짜 → 흰색
                          : 'gray',
                        textAlign: 'center', lineHeight: 20,
                        fontWeight: isHighlighted
                          ? '700'
                          : '400',
                        fontSize: 14,
                      }}
                    >{day}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.runingboxview}>
        <View style={styles.runingtopview}>
          <Text style={styles.runingtitle}>홍길동 님의 러닝 컬렉션</Text>
          <Text style={styles.runingmore}>더보기</Text>
        </View>
        
        <View style={styles.runingcollectionview}>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 0 }}
          >
            {runingcollection_info.map(([distance, address], index) => (
              <View key={index} style={styles.runingcollection}>
                <Image
                  source={map_ready}
                  style={{
                    width: 126,
                    height: 111,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    overflow: 'hidden', // radius 적용
                  }}
                />
                <Text style={styles.runingcollectionkm}>{distance}km</Text>
                <Text style={styles.runingcollectionaddress}>{address}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // 배경색 어둡게
  },
  topboxview:{
    width: '100%',
    height: 148,
    alignItems: 'center',
  },
  titleboxview: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 56,
    height: 30,
  },
  title: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '800',
    paddingLeft: 18,
  },
  toptext: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '600',
    paddingTop: 20,
  },
  calendarboxview: {
    marginHorizontal: 22,
    borderRadius: 12,
    backgroundColor: '#1B1B1B',
    height: 336,
  },
  calendartopview: {
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  calendarallowview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 47,
  },
  calendarmonthtitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400'
  },
  calendarseparator: {
    height: 1,              // 선 높이
    backgroundColor: '#98989f',  // 선 색
    marginHorizontal: 24,
  },
  calendarmonthview: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 49,
  },
  calendarDayHeader: {
    width: 26,            // ✅ 각 요일 고정 폭
    alignItems: 'center', // ✅ 가운데 정렬
  },
  calendarmonth: {
    color: '#39FF14',
    fontSize: 12,
    fontWeight: '500',
  },
  calendardayview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    paddingHorizontal: 9,
    height: 39,
  },
  calendardayeachview: {
    width: 26,
    paddingTop: 8,
    paddingBottom: 3,
  },
  highlightedDay: {
    backgroundColor: '#39FF14',
    borderRadius: 30,
    height: 26,
    justifyContent: 'center', // 🔹 수직 가운데 정렬
    alignItems: 'center',
    marginTop: -3,
  },
  runingboxview: {
    width: '100%',
    height: '100%',
  },
  runingtopview: {
    marginTop: 37,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 22,
    alignItems: 'center',
  },
  runingtitle:{
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500'
  },
  runingmore: {
    color: '#39FF14',
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  runingcollectionview: {
    flexDirection: 'row',
    height: 153,
    marginTop: 20,
    marginHorizontal: 22,
  },
  runingcollection: {
    backgroundColor: '#1B1B1B',
    height: '100%',
    width: 126,
    borderRadius: 10,
    marginRight: 15,
  },
  runingcollectionkm: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 2,
    paddingLeft: 10,
  },
  runingcollectionaddress: {
    color: '#6E6E6E',
    fontSize: 11,
    fontWeight: '400',
    paddingTop: 7,
    paddingLeft: 10,
  },
});
