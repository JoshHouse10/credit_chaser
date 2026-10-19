import {useEffect, useState} from 'react';

export function useDebounce300ms(value) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), 300);
    return () => clearTimeout(timeout);
    }, [value])
return debounced;
}