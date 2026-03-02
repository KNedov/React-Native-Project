import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


export function useAsyncState(key, initialValue) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        async function loadState() {
            try {
                const storedValue = await AsyncStorage.getItem(key)

                if (!storedValue) {
                    return;
                }

                setState(JSON.parse(storedValue));
            } catch (error) {
                throw error
            }
        }

        loadState();
    }, [key]);

    const setAsyncState = async (value) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;

            setState(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            throw error
        }
    };

    return [state, setAsyncState];
}
