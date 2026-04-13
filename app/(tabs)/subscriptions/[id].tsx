import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SubscriptionDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View>
            <Text>subscriptionDetails : {id}</Text>
            <Link href="/">GO Back</Link>
        </View>
    );
};

export default SubscriptionDetails;
