import { useState, useEffect } from 'react';

// Custom hook with terrible practices

// Hook that violates rules of hooks
export function useBadHook(condition: boolean) {
    // Conditional hook usage - BREAKS RULES OF HOOKS!
    if (condition) {
        const [state, setState] = useState(0);
        return state;
    }

    return null;
}

// Hook with side effects everywhere
export function useMessyData(url: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // No cleanup, no error handling, modifying DOM
    useEffect(() => {
        setLoading(true);

        // Modifying global state
        (window as any).currentFetch = url;

        // DOM manipulation in a hook
        document.body.style.cursor = 'wait';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
                document.body.style.cursor = 'default';

                // More side effects
                console.log('Data loaded:', data);
                localStorage.setItem('lastData', JSON.stringify(data));
            });

        // Missing dependency array - runs on every render!
    });

    return { data, loading };
}

// Hook that doesn't follow naming convention
export function BadDataLoader(id: string) {
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        // Synchronous operation in useEffect
        const data = localStorage.getItem(id);
        setResult(JSON.parse(data || '{}'));
    }, [id]);

    return result;
}

// Hook with memory leaks
export function useLeakyInterval(callback: () => void, delay: number) {
    useEffect(() => {
        const interval = setInterval(callback, delay);
        // No cleanup function - MEMORY LEAK!
    }, [callback, delay]);
}

// Hook that mutates props
export function useMutatingHook(obj: any) {
    useEffect(() => {
        // Mutating the input object - BAD!
        obj.processed = true;
        obj.timestamp = Date.now();
    }, [obj]);

    return obj;
}

// Hook with race conditions
export function useRacyData(url: string) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // No abort controller, can cause race conditions
        fetch(url)
            .then(res => res.json())
            .then(setData);
    }, [url]);

    return data;
}

// Hook that returns inconsistent types
export function useInconsistent(flag: boolean) {
    if (flag) {
        return { value: 42, type: 'number' };
    }
    return 'string value';
}
