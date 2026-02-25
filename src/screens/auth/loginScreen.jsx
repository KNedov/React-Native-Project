import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth/useAuth.js';
import { useTheme } from "../../hooks/useTheme.js"
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { theme } = useTheme()
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useAuth();



    const validateForm = () => {

        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email adress is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'The password must be at least 6 characters long !';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {

        if (!validateForm()) return;


        try {
            setIsLoading(true)
            await login(formData.email, formData.password)


        } catch  {
            
            setIsLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Unsuccessful login. ',
                text2: 'Please check your email and password.'

            });


        } finally {

        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.header}>
                        <View style={[styles.logoContainer, { backgroundColor: theme.colors.background }]}>
                            <Ionicons name="person-circle-outline" size={60} color="#007AFF" />

                        </View>
                        <Text style={[styles.title, { color: theme.colors.textCard }]}>Welcome !</Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textCard }]}>Login to your account</Text>
                    </View>




                    <View style={styles.form}>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: theme.colors.textCard }]}>Email</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.email && styles.inputWrapperError,
                                { backgroundColor: theme.colors.background }
                            ]}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={theme.colors.textCreate}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input, { backgroundColor: theme.colors.background }, { color: theme.colors.text }]}
                                    placeholder="example@email.com"
                                    placeholderTextColor={theme.colors.textCard}
                                    value={formData.email}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, email: text });
                                        if (errors.email) {
                                            setErrors({ ...errors, email: null });
                                        }
                                    }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                            {errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={[styles.label, { color: theme.colors.textCard }]}>Password</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.password && styles.inputWrapperError,
                                { backgroundColor: theme.colors.background }
                            ]}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color="#6C6C6C"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input, { backgroundColor: theme.colors.background }, { color: theme.colors.text }]}
                                    placeholder="********"
                                    placeholderTextColor={theme.colors.textCard}
                                    value={formData.password}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, password: text });
                                        if (errors.password) {
                                            setErrors({ ...errors, password: null });
                                        }
                                    }}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={[styles.eyeIcon, { backgroundColor: theme.colors.background }]}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#6C6C6C"

                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.loginButtonText}>Login</Text>
                            )}
                        </TouchableOpacity>


                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.registerLink}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
            <Toast />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333333',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#A0A0A0',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#E0E0E0',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333333',
        paddingHorizontal: 12,
    },
    inputWrapperError: {
        borderColor: '#FF3B30',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
        paddingVertical: 14,
    },
    eyeIcon: {
        padding: 8,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    registerText: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    registerLink: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    socialContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    socialText: {
        color: '#A0A0A0',
        fontSize: 14,
        marginBottom: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333333',
    },
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#fef2f2',
        padding: 12,
        borderRadius: 12,
        marginBottom: 24,
    },
    errorBannerText: {
        flex: 1,
        color: '#ef4444',
        fontSize: 14,
    },
});

