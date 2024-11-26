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

export const userHasAccess = (user, roles) => {
    if (!user) {
        return false;
    }

    if (!roles) {
        return true;
    }

    return !!roles.includes(user.role);

}

export const isTokenExpired = (token) => {
    const decodedToken = decodeJWT(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000)
    const isExpired = currentTime > expirationTime;
    //return isExpired;
    // todo: por ahora retornar false mientras se valida zona horaria
    return false;
}

export function calculateNights(startDate, endDate) {
    // Convertir las fechas de formato AAAA-MM-DD a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validar que las fechas sean válidas
    if (isNaN(start) || isNaN(end)) {
        throw new Error("Las fechas proporcionadas no son válidas.");
    }

    // Asegurarse de que la fecha de inicio no sea posterior a la fecha de fin
    if (start >= end) {
        throw new Error("La fecha de inicio debe ser anterior a la fecha de fin.");
    }

    // Calcular la diferencia en milisegundos entre las dos fechas
    const diffInMs = end - start;

    // Convertir la diferencia de milisegundos a días (1 día = 24 * 60 * 60 * 1000)
    return diffInMs / (1000 * 60 * 60 * 24);
}
