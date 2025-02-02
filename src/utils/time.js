export function formatTime(timeString) {
    if (!timeString) return ""; // Handle null/undefined cases
  
    const [hour, minute] = timeString.split(":");
    const formattedHour = hour % 12 || 12; // Convert 24-hour to 12-hour format
    const ampm = hour >= 12 ? "PM" : "AM";
  
    return `${formattedHour}:${minute} ${ampm}`;
}
  