
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

const CheckoutInput = ({
    field,
    label,
    placeholder,
    value,
    error,
    onChangeText,
    theme,
    loading,
    keyboardType = 'default',
    maxLength,
    secureTextEntry = false,
}) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
                {label}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                        borderColor: error ? '#FF3B30' : theme.colors.border,
                    }
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textCard}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                editable={!loading}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
    },
});

export default CheckoutInput;