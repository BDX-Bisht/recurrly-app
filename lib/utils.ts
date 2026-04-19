    import dayjs from "dayjs";

export function formatCurrency(
    value: number | string,
    currency = "USD",
): string {
    const normalizedValue =
        typeof value === "number"
            ? value
            : Number(String(value).replace(/[^0-9.-]+/g, ""));
    const amount = Number.isFinite(normalizedValue) ? normalizedValue : 0;

    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    }
}

export const formatSubscriptionDateTime = (value?: string): string => {
    if (!value) return "Not provided";
    const parsedDate = dayjs(value);
    return parsedDate.isValid()
        ? parsedDate.format("MM/DD/YYYY")
        : "Not provided";
};

export const formatStatusLabel = (value?: string): string => {
    if (!value) return "Unknown";
    return value.charAt(0).toUpperCase() + value.slice(1);
};
