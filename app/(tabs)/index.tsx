import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text className="font-sans-bold text-primary text-4xl">Home</Text>
            <Link
                href="/onboarding"
                className="mt-4 rounded font-sans-semibold bg-primary text-white p-4"
            >
                Go to OnBoarding
            </Link>
            <Link
                href="/(auth)/sign-up"
                className="mt-4 bg-primary font-sans-semibold text-white p-4"
            >
                Sign Up{" "}
            </Link>
            <Link
                href="/(auth)/sign-in"
                className="mt-4 bg-primary font-sans-semibold text-white p-4"
            >
                Sign in{" "}
            </Link>
        </SafeAreaView>
    );
}
