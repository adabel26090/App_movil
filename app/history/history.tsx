import { View, StyleSheet } from 'react-native';
import { HistoryMarketView } from '../../components/location/historyMarketView';

export default function HistoryScreen() {
    return (
        <View style={styles.container}>
            <HistoryMarketView />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
}); 