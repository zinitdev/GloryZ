export default function formatAsPercentage(num) {
    return new Intl.NumberFormat("default", {
        style: "percent",
    }).format(-num / 1);
}
