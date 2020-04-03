export function getPaginatorOptions(len: number): number[] {
    return len > 50 ?
        [5, 10, 25, 50, len] :
        [5, 10, 25, 50];
}

export function checkIfNumberOrFrac(data: string ) {
    if (data.match(/^\d+$/)) {
        return Number(data);
    }
    if (data.match(/^\d+\/\d+$/)) {
        const twoNums: string[] = data.split("/");
        return Number(twoNums[0]) / Number(twoNums[1]);
    }
    return data;
}
