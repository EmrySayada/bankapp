export function dater(date) {
    const day = date.slice(4,16);
    const hour = date.slice(17,22);
    return day + " " + hour
}