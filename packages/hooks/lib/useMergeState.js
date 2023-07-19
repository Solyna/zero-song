import { useState } from 'react';
export const useMergeState = (initialState) => {
    const [state, setState] = useState(initialState);
    const setMergeState = (newState) => setState((prevState) => (Object.assign(Object.assign({}, prevState), newState)));
    return [state, setMergeState];
};
