import { useSignIn } from "@clerk/expo";
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

export default function SignInPage() {
    const { signIn, errors, fetchStatus } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleSubmit = async () => {
        setErrorMessage("");

        const { error } = await signIn.password({
            emailAddress,
            password,
        });

        if (error) {
            console.error(JSON.stringify(error, null, 2));
            setErrorMessage(
                error?.longMessage ??
                    error?.message ??
                    "An error occurred during sign in",
            );
            return;
        }

        if (signIn.status === "complete") {
            console.log("SignIn Status:", signIn.status);
            await signIn.finalize({
                navigate: ({ session }) => {
                    if (session?.currentTask) {
                        return;
                    }
                    router.replace("/(tabs)" as Href);
                },
            });
        }
    };

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

                    <Text className="auth-title">Welcome back</Text>
                    <Text className="auth-subtitle">
                        Sign in to continue managing your subscriptions
                    </Text>
                </View>

                <View className="auth-card">
                    <View className="auth-form">
                        <View className="auth-field">
                            <Text className="auth-label">Email</Text>
                            <TextInput
                                className={clsx(
                                    "auth-input",
                                    errors?.fields?.identifier &&
                                        "auth-input-error",
                                )}
                                style={{ paddingHorizontal: 16 }}
                                autoCapitalize="none"
                                value={emailAddress}
                                placeholder="Enter your email"
                                placeholderTextColor="#666666"
                                onChangeText={setEmailAddress}
                                keyboardType="email-address"
                            />
                            {errors?.fields?.identifier && (
                                <Text className="auth-error">
                                    {errors.fields.identifier.message}
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
                                placeholder="Enter your password"
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
                                    Sign in
                                </Text>
                            )}
                        </Pressable>
                    </View>

                    <View className="auth-link-row">
                        <Text className="auth-link-copy">New to Recurly?</Text>
                        <Link href="/(auth)/sign-up">
                            <Text className="auth-link">Create an account</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
