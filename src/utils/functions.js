// Takes a timestamp and returns a formated date
exports.formatDate = (timestamp) => {
    const fullDate = new Date(timestamp);
    const now = new Date(Date.now());
    const elapsedDays = Math.abs(Date.now() - Date.parse(timestamp)) / 86400000;
    let formatedDate = '';

    // Dictionnary to convert the month's number to a string
    const months = [
        "janv.",
        "fév.",
        "mars",
        "avril",
        "mai",
        "juin",
        "juil.",
        "août",
        "sep.",
        "oct.",
        "nov.",
        "déc."
    ];

    // Gets the date
    // Uses 'today' or 'yesterday' if possible
    if (elapsedDays < 1) {
        formatedDate += `aujourd'hui`;
    } else if (elapsedDays < 2) {
        formatedDate += 'hier';
    } else {
        const year = fullDate.getFullYear() !== now.getFullYear() ? fullDate.getFullYear() : '';
        formatedDate += `le ${fullDate.getDate()} ${months[fullDate.getMonth()]} ${year}`;
    }

    // Adds hours and minutes (adding a '0' if necessary)
    formatedDate += ` à ${fullDate.getHours()}h${('0'+fullDate.getMinutes()).slice(-2)}`;

    return formatedDate;
}