const timeFormatter = (string) => {
    const start = string.indexOf('T');
    const end = string.indexOf('+')

    return string.slice(start + 1, end)
}

export default timeFormatter