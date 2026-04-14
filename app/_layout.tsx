import "@/global.css";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "sans-regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "sans-bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "sans-medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "sans-semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "sans-extrabold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "sans-light": require("../assets/fonts/Poppins-Light.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return <Stack screenOptions={{ headerShown: false }} />;
}
