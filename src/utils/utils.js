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


export function decodeJWT(token) {
    if (!token) {
        throw new Error("Token no proporcionado");
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("Token inválido");
    }

    const payload = parts[1];

    // Decodificar Base64 con UTF-8
    const decodedPayload = decodeURIComponent(
        atob(payload)
            .split('')
            .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    // Convertir a JSON
    try {
        return JSON.parse(decodedPayload);
    } catch (e) {
        throw new Error("No se pudo convertir el payload a JSON");
    }
}
