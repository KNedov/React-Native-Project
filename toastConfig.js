
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useTheme } from './src/hooks/useTheme'; 


const ConfirmToast = ({ text1, text2, props }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.confirmToast, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.confirmTitle, { color: theme.colors.text }]}>
                {text1}
            </Text>
            {text2 && (
                <Text style={[styles.confirmText, { color: theme.colors.text }]}>
                    {text2}
                </Text>
            )}
            
            <View style={styles.buttonRow}>
                <TouchableOpacity 
                    style={[styles.button, styles.cancelButton, { backgroundColor: theme.colors.backgroundCard }]}
                    onPress={() => {
                        props?.onCancel?.();
                        Toast.hide();
                    }}
                >
                    <Text style={[styles.cancelButtonText, { color: theme.colors.text }]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, styles.okButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => {
                        props?.onConfirm?.();
                        Toast.hide();
                    }}
                >
                    <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export const toastConfig = {
    confirm: (props) => <ConfirmToast {...props} />
};


const styles = StyleSheet.create({
    confirmToast: {
        width: '85%',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#333333',
    },
    confirmTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    confirmText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
    },
    okButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});