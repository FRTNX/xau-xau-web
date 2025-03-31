

const formatPrice = (n: number) => Number(Math.floor(n)).toLocaleString() + Number(n - Math.floor(n)).toFixed(2).slice(1);

const shuffleArray = (array: Array<Object>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export {
    formatPrice,
    shuffleArray
};
