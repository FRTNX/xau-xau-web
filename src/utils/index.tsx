

const formatPrice = (n: number) => Number(Math.floor(n)).toLocaleString() + Number(n - Math.floor(n)).toFixed(2).slice(1);

export {
    formatPrice
};
