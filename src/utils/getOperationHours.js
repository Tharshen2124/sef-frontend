export function getOperationHours(startTime, endTime) {
    const formatTime = (time) => {
        let [hour, minutes] = time.split(":").map(Number);
        const period = hour >= 12 ? "pm" : "pm";
        hour = hour % 12 || 12; // Convert 24-hour format to 12-hour format
        return `${hour}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    const startFormatted = formatTime(startTime);
    const endFormatted = formatTime(endTime);

    return `${startFormatted} - ${endFormatted}`;
}