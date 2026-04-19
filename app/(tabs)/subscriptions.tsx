import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptionContext } from "@/context/SubscriptionContext";
import { styled } from "nativewind";
import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const subscriptions = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
    const { subscriptions } = useSubscriptionContext();
    
    const filteredSubscriptions = subscriptions.filter((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="px-5 py-5 border-b border-border">
                <Text className="text-2xl font-sans-bold text-primary mb-4">
                    Subscriptions
                </Text>
                <TextInput
                    className="auth-input"
                    style={{ paddingHorizontal: 16 }}
                    placeholder="Search subscriptions..."
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="px-5 mb-4">
                        <SubscriptionCard
                            {...item}
                            expanded={expandedCardId === item.id}
                            onPress={() =>
                                setExpandedCardId(
                                    expandedCardId === item.id ? null : item.id
                                )
                            }
                        />
                    </View>
                )}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center pt-10">
                        <Text className="text-lg font-sans-medium text-muted-foreground">
                            No subscriptions found.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default subscriptions;
