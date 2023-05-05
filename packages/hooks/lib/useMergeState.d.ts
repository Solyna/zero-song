export interface IUseMergeState {
    <S>(initialState?: Partial<S>): [Partial<S>, (newState: Partial<S>) => void];
}
export declare const useMergeState: (initialState?: any) => any[];
