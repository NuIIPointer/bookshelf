import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string, store = '@GlobalStore') => {
    try {
        await AsyncStorage.setItem(`${store}:${key}`, value);
    } catch (error) {
        // Error saving data
        console.log('error', error);
    }
};

export const retrieveData = async (key: string, store = '@GlobalStore') => {
    try {
        const value = await AsyncStorage.getItem(`${store}:${key}`);
        return value;
    } catch (error) {
        // Error retrieving data
        console.log('error', error);
    }

    return null;
};
