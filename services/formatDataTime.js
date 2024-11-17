function formatDateTime(dateString) {
    const date = new Date(dateString);

    // Format date to dd-mm-yy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

    // Format time to hh:mm:ss am/pm
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}

module.exports = formatDateTime;
