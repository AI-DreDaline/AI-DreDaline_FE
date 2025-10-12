import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import useTabBarVisibility from "../assets/useTabBarVisibility";

const { width } = Dimensions.get('window');

const MainNavigate = () => (
    <View style={styles.page}>
        <Text>Main Navigate</Text>
    </View>
);

const LeftNavigate = () => (
    <View style={styles.page}>
        <Text>Left Navigate</Text>
    </View>
);

const RightNavigate = () => (
    <View style={styles.page}>
        <Text>Right Navigate</Text>
    </View>
);

const NavigateScreen = () => {
    useTabBarVisibility(false);
    const pagerRef = useRef<PagerView>(null);
    const [currentPage, setCurrentPage] = useState(1); // 처음은 Main

    const goToPage = (index: number) => {
        pagerRef.current?.setPage(index);
        setCurrentPage(index);
    };

    return (
        <View style={{ flex: 1 }}>
            <PagerView
                style={{ flex: 1 }}
                initialPage={1}
                ref={pagerRef}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
                <View key="0">
                    <LeftNavigate />
                </View>
                <View key="1">
                    <MainNavigate />
                </View>
                <View key="2">
                    <RightNavigate />
                </View>
            </PagerView>

            {/* 하단 고정 탭 */}
            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => goToPage(0)} style={styles.tab}>
                    <Text style={currentPage === 0 ? { fontWeight: 'bold' } : {}}>Left</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToPage(1)} style={styles.tab}>
                    <Text style={currentPage === 1 ? { fontWeight: 'bold' } : {}}>Main</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToPage(2)} style={styles.tab}>
                    <Text style={currentPage === 2 ? { fontWeight: 'bold' } : {}}>Right</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavigateScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        width: '100%',
        height: 139,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});