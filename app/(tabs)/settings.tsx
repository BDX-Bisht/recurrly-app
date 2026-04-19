import { useAuth, useUser } from "@clerk/expo";
import { styled } from "nativewind";
import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
    const { signOut } = useAuth();
    const { user } = useUser();

    // Format joined date
    const joinedDate = user?.createdAt 
        ? new Date(user.createdAt).toLocaleDateString('en-GB') 
        : "Unknown";

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <View className="mb-6 mt-4">
                <Text className="text-3xl font-sans-bold text-primary">Settings</Text>
            </View>

            {/* Profile Card */}
            <View className="mb-6 rounded-3xl border border-border bg-card p-5 flex-row items-center gap-4">
                <Image 
                    source={{ uri: user?.imageUrl }} 
                    className="size-16 rounded-full"
                />
                <View className="flex-1">
                    <Text className="text-xl font-sans-bold text-primary">
                        {user?.fullName || "User"}
                    </Text>
                    <Text className="text-sm font-sans-medium text-muted-foreground">
                        {user?.primaryEmailAddress?.emailAddress || "No email"}
                    </Text>
                </View>
            </View>

            {/* Account Card */}
            <View className="mb-6 rounded-3xl border border-border bg-card p-5">
                <Text className="mb-4 text-lg font-sans-bold text-primary">Account</Text>
                
                <View className="mb-4 flex-row items-center justify-between">
                    <Text className="text-base font-sans-medium text-muted-foreground">Account ID</Text>
                    <Text className="text-sm font-sans-semibold text-primary truncate pl-4" style={{ flex: 1, textAlign: 'right' }}>
                        {user?.id ? `${user.id.substring(0, 20)}...` : "Unknown"}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-base font-sans-medium text-muted-foreground">Joined</Text>
                    <Text className="text-sm font-sans-semibold text-primary">{joinedDate}</Text>
                </View>
            </View>

            {/* Sign Out Button */}
            <Pressable 
                className="mt-4 items-center rounded-2xl bg-destructive py-4"
                onPress={() => signOut()}
            >
                <Text className="text-base font-sans-bold text-white">Sign Out</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default Settings;
