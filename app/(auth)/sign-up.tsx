import { useAuth, useSignUp } from "@clerk/expo";
import clsx from "clsx";
import { type Href, Link, useRouter } from "expo-router";
import { styled } from "nativewind";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function SignUpPage() {
    const { signUp, errors, fetchStatus } = useSignUp();
    const { isSignedIn } = useAuth();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [code, setCode] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleSubmit = async () => {
        setErrorMessage("");

        const { error } = await signUp.password({
            emailAddress,
            password,
        });

        if (error) {
            console.error(JSON.stringify(error, null, 2));
            setErrorMessage(
                error?.longMessage ??
                    error?.message ??
                    "An error occurred during sign up",
            );
            return;
        }

        await signUp.verifications.sendEmailCode();
    };

    const handleVerify = async () => {
        setErrorMessage("");

        await signUp.verifications.verifyEmailCode({
            code,
        });

        if (signUp.status === "complete") {
            await signUp.finalize({
                navigate: ({ session }) => {
                    if (session?.currentTask) {
                        return;
                    }
                    router.replace("/(tabs)" as Href);
                },
            });
        }
    };

    if (signUp.status === "complete" || isSignedIn) {
        return null;
    }

    if (
        signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0
    ) {
        return (
            <SafeAreaView className="auth-safe-area">
                <View className="auth-content justify-center">
                    <View className="auth-brand-block">
                        <Text className="auth-title">Verify your email</Text>
                        <Text className="auth-subtitle">
                            Enter the verification code sent to your email.
                        </Text>
                    </View>
                    <View className="auth-card">
                        <View className="auth-form">
                            <View className="auth-field">
                                <Text className="auth-label">
                                    Verification Code
                                </Text>
                                <TextInput
                                    className={clsx(
                                        "auth-input",
                                        errors?.fields?.code &&
                                            "auth-input-error",
                                    )}
                                    style={{ paddingHorizontal: 16 }}
                                    value={code}
                                    placeholder="Enter your verification code"
                                    placeholderTextColor="#666666"
                                    onChangeText={setCode}
                                    keyboardType="numeric"
                                />
                                {errors?.fields?.code && (
                                    <Text className="auth-error">
                                        {errors.fields.code.message}
                                    </Text>
                                )}
                            </View>
                            <Pressable
                                className={clsx(
                                    "auth-button",
                                    (fetchStatus === "fetching" || !code) &&
                                        "auth-button-disabled",
                                )}
                                onPress={handleVerify}
                                disabled={fetchStatus === "fetching" || !code}
                            >
                                {fetchStatus === "fetching" ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text className="auth-button-text">
                                        Verify
                                    </Text>
                                )}
                            </Pressable>
                            <Pressable
                                className="auth-secondary-button mt-2"
                                onPress={() =>
                                    signUp.verifications.sendEmailCode()
                                }
                            >
                                <Text className="auth-secondary-button-text">
                                    I need a new code
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="auth-safe-area">
            <View className="auth-content">
                <View className="auth-brand-block">
                    <View className="auth-logo-wrap">
                        <View className="auth-logo-mark">
                            <Text className="auth-logo-mark-text">R</Text>
                        </View>
                        <View>
                            <Text className="auth-wordmark">Recurly</Text>
                            <Text className="auth-wordmark-sub">
                                SMART BILLING
                            </Text>
                        </View>
                    </View>

                    <Text className="auth-title">Create an account</Text>
                    <Text className="auth-subtitle">
                        Join Recurly to manage your subscriptions
                    </Text>
                </View>

                <View className="auth-card">
                    <View className="auth-form">
                        {errorMessage ? (
                            <Text
                                className="auth-error text-center mb-2"
                                style={{ fontSize: 14 }}
                            >
                                {errorMessage}
                            </Text>
                        ) : null}
                        <View className="auth-field">
                            <Text className="auth-label">Email</Text>
                            <TextInput
                                className={clsx(
                                    "auth-input",
                                    errors?.fields?.emailAddress &&
                                        "auth-input-error",
                                )}
                                style={{ paddingHorizontal: 16 }}
                                autoCapitalize="none"
                                value={emailAddress}
                                placeholder="Enter email"
                                placeholderTextColor="#666666"
                                onChangeText={setEmailAddress}
                                keyboardType="email-address"
                            />
                            {errors?.fields?.emailAddress && (
                                <Text className="auth-error">
                                    {errors.fields.emailAddress.message}
                                </Text>
                            )}
                        </View>

                        <View className="auth-field">
                            <Text className="auth-label">Password</Text>
                            <TextInput
                                className={clsx(
                                    "auth-input",
                                    errors?.fields?.password &&
                                        "auth-input-error",
                                )}
                                style={{ paddingHorizontal: 16 }}
                                value={password}
                                placeholder="Enter password"
                                placeholderTextColor="#666666"
                                secureTextEntry
                                onChangeText={setPassword}
                            />
                            {errors?.fields?.password && (
                                <Text className="auth-error">
                                    {errors.fields.password.message}
                                </Text>
                            )}
                        </View>

                        <Pressable
                            className={clsx(
                                "auth-button",
                                (!emailAddress ||
                                    !password ||
                                    fetchStatus === "fetching") &&
                                    "auth-button-disabled",
                            )}
                            onPress={handleSubmit}
                            disabled={
                                !emailAddress ||
                                !password ||
                                fetchStatus === "fetching"
                            }
                        >
                            {fetchStatus === "fetching" ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="auth-button-text">
                                    Create Account
                                </Text>
                            )}
                        </Pressable>
                    </View>

                    <View className="auth-link-row">
                        <Text className="auth-link-copy">
                            Already have an account?
                        </Text>
                        <Link href="/(auth)/sign-in">
                            <Text className="auth-link">Sign in</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
