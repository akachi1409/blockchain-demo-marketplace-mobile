import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = "token"

export const TOKEN = {
    get : async() => {
        const token = await AsyncStorage.getItem(TOKEN_KEY)
        if (token){
            return token;
        }
        return '';
    },
    set: (token) => AsyncStorage.setItem(TOKEN_KEY, token),
    remove: () => AsyncStorage.removeItem(TOKEN_KEY),
}