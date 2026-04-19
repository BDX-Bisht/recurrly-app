import { icons } from "@/constants/icons";
import clsx from "clsx";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
    { label: "Entertainment", color: "#f5c542" },
    { label: "AI Tools", color: "#b8d4e3" },
    { label: "Developer Tools", color: "#e8def8" },
    { label: "Design", color: "#b8e8d0" },
    { label: "Productivity", color: "#f4cccc" },
    { label: "Cloud", color: "#d9ead3" },
    { label: "Music", color: "#cfe2f3" },
    { label: "Other", color: "#ead1dc" },
];

export interface CreateSubscriptionModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (subscription: Subscription) => void;
}

export default function CreateSubscriptionModal({
    visible,
    onClose,
    onSubmit,
}: CreateSubscriptionModalProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
    const [category, setCategory] = useState(CATEGORIES[0].label);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => setKeyboardVisible(true),
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => setKeyboardVisible(false),
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const isPriceValid = !isNaN(parseFloat(price)) && parseFloat(price) > 0;
    const isValid = name.trim().length > 0 && isPriceValid;

    const handleClose = () => {
        setName("");
        setPrice("");
        setFrequency("Monthly");
        setCategory(CATEGORIES[0].label);
        onClose();
    };

    const handleSubmit = () => {
        if (!isValid) return;

        const categoryObj =
            CATEGORIES.find((c) => c.label === category) ||
            CATEGORIES[CATEGORIES.length - 1];

        const now = dayjs();
        const renewalDate =
            frequency === "Monthly" ? now.add(1, "month") : now.add(1, "year");

        const newSubscription: Subscription = {
            id: Date.now().toString(),
            name: name.trim(),
            price: parseFloat(price),
            billing: frequency,
            category,
            status: "active",
            startDate: now.toISOString(),
            renewalDate: renewalDate.toISOString(),
            icon: icons.wallet,
            color: categoryObj.color,
            currency: "USD",
            plan: "Custom Plan",
            paymentMethod: "Not specified",
        };

        onSubmit(newSubscription);
        handleClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="modal-overlay">
                    <View
                        className={clsx(
                            "modal-container",
                            isKeyboardVisible
                                ? "mt-0 h-full max-h-full rounded-none"
                                : "mt-auto max-h-[90%]",
                        )}
                    >
                        <SafeAreaView edges={["top"]} className="flex-1">
                            <View className="modal-header">
                                <Text className="modal-title">
                                    New Subscription
                                </Text>
                                <Pressable
                                    onPress={handleClose}
                                    className="modal-close"
                                >
                                    <View className="size-6 items-center justify-center">
                                        <Text className="modal-close-text text-xl">
                                            ✕
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>

                            <ScrollView
                                className="modal-body"
                                contentContainerClassName="pb-20"
                                keyboardShouldPersistTaps="handled"
                            >
                                <View className="auth-field mb-4">
                                    <Text className="auth-label">Name</Text>
                                    <TextInput
                                        className="auth-input"
                                        style={{ paddingHorizontal: 16 }}
                                        placeholder="e.g., Netflix"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>

                                <View className="auth-field mb-4">
                                    <Text className="auth-label">Price</Text>
                                    <TextInput
                                        className="auth-input"
                                        style={{ paddingHorizontal: 16 }}
                                        placeholder="0.00"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        keyboardType="decimal-pad"
                                        value={price}
                                        onChangeText={setPrice}
                                    />
                                </View>

                                <View className="auth-field mb-4">
                                    <Text className="auth-label">
                                        Frequency
                                    </Text>
                                    <View className="picker-row">
                                        <Pressable
                                            className={clsx(
                                                "picker-option",
                                                frequency === "Monthly" &&
                                                    "picker-option-active",
                                            )}
                                            onPress={() =>
                                                setFrequency("Monthly")
                                            }
                                        >
                                            <Text
                                                className={clsx(
                                                    "picker-option-text",
                                                    frequency === "Monthly" &&
                                                        "picker-option-text-active",
                                                )}
                                            >
                                                Monthly
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            className={clsx(
                                                "picker-option",
                                                frequency === "Yearly" &&
                                                    "picker-option-active",
                                            )}
                                            onPress={() =>
                                                setFrequency("Yearly")
                                            }
                                        >
                                            <Text
                                                className={clsx(
                                                    "picker-option-text",
                                                    frequency === "Yearly" &&
                                                        "picker-option-text-active",
                                                )}
                                            >
                                                Yearly
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>

                                <View className="auth-field mb-6">
                                    <Text className="auth-label">Category</Text>
                                    <View className="category-scroll">
                                        {CATEGORIES.map((cat) => (
                                            <Pressable
                                                key={cat.label}
                                                className={clsx(
                                                    "category-chip",
                                                    category === cat.label &&
                                                        "category-chip-active",
                                                )}
                                                onPress={() =>
                                                    setCategory(cat.label)
                                                }
                                            >
                                                <Text
                                                    className={clsx(
                                                        "category-chip-text",
                                                        category ===
                                                            cat.label &&
                                                            "category-chip-text-active",
                                                    )}
                                                >
                                                    {cat.label}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>

                                <Pressable
                                    className={clsx(
                                        "auth-button",
                                        !isValid && "auth-button-disabled",
                                    )}
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                >
                                    <Text className="auth-button-text">
                                        Create Subscription
                                    </Text>
                                </Pressable>
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
