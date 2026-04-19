import "@/global.css";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { PostHogProvider } from "posthog-react-native";
import { SubscriptionProvider } from "@/context/SubscriptionContext";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
}

const InitialLayout = () => {
    const { isLoaded } = useAuth();
    const [fontsLoaded] = useFonts({
        "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
        "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
        "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded && isLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, isLoaded]);

    if (!fontsLoaded || !isLoaded) return null;

    return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
    return (
        <PostHogProvider
            apiKey={process.env.EXPO_PUBLIC_POSTHOG_KEY!}
            options={{ host: process.env.EXPO_PUBLIC_POSTHOG_HOST }}
        >
            <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
                <SubscriptionProvider>
                    <InitialLayout />
                </SubscriptionProvider>
            </ClerkProvider>
        </PostHogProvider>
    );
}
