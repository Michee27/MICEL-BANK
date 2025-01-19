const toNumber = (value) => {
    if (typeof value === 'number') {
        return value;
    }
    const converted = Number(value);
    if (isNaN(converted)) {
        throw new Error('O valor fornecido não pode ser convertido em número');
    }
    return converted;
}

const reaisToCentavos = (value) => {
    const numberValue = toNumber(value);
    return Math.round(numberValue * 100);
}

const centavosToReais = (value) => {
    const numberValue = toNumber(value);
    return (numberValue / 100).toFixed(2);
}

module.exports = {
    reaisToCentavos,
    centavosToReais
}