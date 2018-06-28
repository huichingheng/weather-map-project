const timeFormatter = (string) => {
    const start = string.indexOf('T');
    const end = string.indexOf('+')

    const fullTime = string.slice(start + 1, end)
    const hoursMinute = fullTime.slice(0, fullTime.length - 3)
    return hoursMinute
}

export default timeFormatter