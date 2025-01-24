export const sort = (selectedArray) => {

    const epoques = [[1781, 1870],[1871, 1922], [1923, 1940], [1941, 1958], [1959, 1974],[1975, 1991],[1992, 2007],[2008, 2024]]

    let data = [
        { id: 1, value: 0, color: '#e57316' },
        { id: 2, value: 0, color: '#e5a717' },
        { id: 3, value: 0, color: '#e6caa0' },
        { id: 4, value: 0, color: '#f3f3f3' },
        { id: 5, value: 0, color: '#a1e6db' },
        { id: 6, value: 0, color: '#17afe6' },
        { id: 7, value: 0, color: '#1616ff' },
        { id: 8, value: 0, color: '#ab17e6' },
    ]

    for (const feature of selectedArray) {
        const year_built = feature.properties.year_built
        for (let i = 0; i < epoques.length; i++ ) {
            if (year_built >= epoques[i][0] && year_built <= epoques[i][1]) {
                data[i].value = data[i].value + feature.properties.sqr
            }
        }
    }

    return data
}