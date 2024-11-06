export const choiceRandomNFromList = (list, n) => {
    const randomList = [];
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * list.length);
        // validar que el objeto no se repita
        if (randomList.includes(list[randomIndex])) {
            i--;
        } else {
            randomList.push(list[randomIndex]);
        }
    }
    return randomList;
}

export const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

    return formattedValue.replace('COP', '$');
};
