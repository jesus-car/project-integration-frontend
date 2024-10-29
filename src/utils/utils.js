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