export function getPaginatorOptions(len: number): number[] {
    return len > 50 ?
        [5, 10, 25, 50, len] :
        [5, 10, 25, 50];
}
