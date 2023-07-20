export function sleep(number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(number);
        }, number);
    });
}
