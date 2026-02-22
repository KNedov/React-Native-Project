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
import {useTheme} from "../../hooks/useTheme.js"

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const {theme}=useTheme()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { register, isLoading, error, clearError } = useAuth();

  
    const validateForm = () => {
        const newErrors = {};

  
        if (!formData.name.trim()) {
            newErrors.name = 'Name is Required !';
        } else if (formData.name.length < 2) {
            newErrors.name = 'The name must be at least 2 characters long !';
        }

   
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address !';
        }

      
        if (!formData.password) {
            newErrors.password = 'Password is required !';
        } else if (formData.password.length < 6) {
            newErrors.password = 'The password must be at least 6 characters long';
        } 
       
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm the password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {

         clearError();
        if (!validateForm()) return;

        try {
            
             await register(formData.email, formData.password, formData.name);
          
        } catch (error) {
            Alert.alert(
                'Error',
                'Registration failed. Please try again.'
            );
        }
    };

    return (
        <SafeAreaView style={[styles.container,{backgroundColor:theme.colors.background},{color:theme.colors.background}]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={[styles.scrollContent]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                >
                   
                    <View style={styles.header}>
                        <View style={[styles.logoContainer,{backgroundColor:theme.colors.background}]}>
                            <Ionicons name="person-add" size={50} color="#007AFF" />
                        </View>
                        <Text style={[styles.title,{color:theme.colors.text}]}>Create Account</Text>
                        <Text style={[styles.subtitle,,{color:theme.colors.text}]}>
                            Sign up to continue
                        </Text>
                    </View>

                  
                    <View style={styles.form}>
                      
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label,{color:theme.colors.text}]}>Name *</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.name && styles.inputWrapperError,
                                {backgroundColor:theme.colors.background},
                                
                            ]}>
                                <Ionicons
                                    name="person-outline"
                                    size={20}
                                    color="#6C6C6C"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input,{color:theme.colors.text}]}
                                    placeholder="Ivan Ivanov"
                                    placeholderTextColor="#6C6C6C"
                                    value={formData.name}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, name: text });
                                        if (errors.name) {
                                            setErrors({ ...errors, name: null });
                                        }
                                    }}
                                />
                            </View>
                            {errors.name && (
                                <Text style={styles.errorText}>{errors.name}</Text>
                            )}
                        </View>

                     
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label,{color:theme.colors.text}]}>Email *</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.email && styles.inputWrapperError,
                                {backgroundColor:theme.colors.background}
                            ]}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color="#6C6C6C"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input,{color:theme.colors.text}]}
                                    placeholder="example@email.com"
                                    placeholderTextColor="#6C6C6C"
                                    value={formData.email}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, email: text });
                                        if (errors.email) {
                                            setErrors({ ...errors, email: null });
                                        }
                                    }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            {errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                        </View>

                     
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label,{color:theme.colors.text}]}>Password *</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.password && styles.inputWrapperError,
                                {backgroundColor:theme.colors.background}
                            ]}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color="#6C6C6C"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input,{color:theme.colors.text}]}
                                    placeholder="********"
                                    placeholderTextColor="#6C6C6C"
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
                                    style={styles.eyeIcon}
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

                        
                        <View style={styles.inputContainer}>
                            <Text style={[styles.label,{color:theme.colors.text}]}>Confirm password *</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.confirmPassword && styles.inputWrapperError,
                                {backgroundColor:theme.colors.background},
                                
                            ]}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color="#6C6C6C"
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={[styles.input,{color:theme.colors.text}]}
                                    placeholder="********"
                                    placeholderTextColor="#6C6C6C"
                                    value={formData.confirmPassword}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, confirmPassword: text });
                                        if (errors.confirmPassword) {
                                            setErrors({ ...errors, confirmPassword: null });
                                        }
                                    }}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#6C6C6C"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && (
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            )}
                        </View>

                       

                     
                        <TouchableOpacity
                            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.registerButtonText}>Register</Text>
                            )}
                        </TouchableOpacity>

                       
                    </View>

          
                    <Text style={styles.termsText}>
                       By registering, you agree to{' '}
                        <Text style={styles.termsLink}>Terms and Conditions</Text> and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
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
        marginTop: 20,
        marginBottom: 30,
    },
    logoContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333333',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#A0A0A0',
        textAlign: 'center',
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
    requirementsContainer: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333333',
    },
    requirementsTitle: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 12,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    requirementText: {
        color: '#A0A0A0',
        fontSize: 13,
    },
    registerButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    registerButtonDisabled: {
        opacity: 0.7,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    loginText: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    loginLink: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    termsText: {
        color: '#6C6C6C',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 24,
    },
    termsLink: {
        color: '#007AFF',
    },
});

export default RegisterScreen;