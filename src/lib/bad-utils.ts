// Utility file with terrible practices

// Global mutable state - BAD!
let globalCounter = 0;
let globalCache: any = {};
let globalUser: any = null;

// Function with too many parameters and no clear purpose
export function doSomething(a: any, b: any, c: any, d: any, e: any, f: any, g: any) {
    // No input validation
    // Deep nesting
    if (a) {
        if (b) {
            if (c) {
                if (d) {
                    if (e) {
                        if (f) {
                            if (g) {
                                return a + b + c + d + e + f + g;
                            }
                        }
                    }
                }
            }
        }
    }
    return 0;
}

// Function that modifies global state
export function incrementCounter() {
    globalCounter++;
    return globalCounter;
}

// Function with side effects not indicated by name
export function getUser(id: string) {
    // Mutating global state in a getter!
    globalUser = { id: id, name: 'User' + id };
    globalCache[id] = globalUser;
    console.log('Fetching user:', id);
    return globalUser;
}

// Copy-pasted code with slight variations
export function formatPrice1(price: number) {
    if (price > 1000) {
        return '$' + (price / 1000).toFixed(2) + 'k';
    }
    return '$' + price.toFixed(2);
}

export function formatPrice2(price: number) {
    if (price > 1000) {
        return '$' + (price / 1000).toFixed(2) + 'K';
    }
    return '$' + price.toFixed(2);
}

export function formatPrice3(price: number) {
    if (price > 1000) {
        return (price / 1000).toFixed(2) + 'k USD';
    }
    return price.toFixed(2) + ' USD';
}

// Function that does too many things
export function processUserData(userData: any) {
    // No type safety
    // Mixing concerns: validation, transformation, side effects
    console.log('Processing user:', userData);

    if (!userData) return null;

    // Mutating input
    userData.processed = true;
    userData.timestamp = Date.now();

    // Making API calls in a utility function
    fetch('/api/log', {
        method: 'POST',
        body: JSON.stringify(userData)
    });

    // DOM manipulation in a utility function
    document.title = userData.name;

    // Returning different types based on conditions
    if (userData.type === 'admin') {
        return { ...userData, isAdmin: true };
    }

    return userData.name;
}

// Magic numbers everywhere
export function calculateScore(value: number) {
    return (value * 0.75 + 100) / 3.14159 - 42;
}

// No error handling
export function parseJSON(str: string) {
    return JSON.parse(str);
}

// Synchronous sleep function - VERY BAD!
export function sleep(ms: number) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Blocking the main thread
    }
}

// Function with unclear name and purpose
export function x(y: any) {
    return y ? y.z : null;
}

// Exporting global mutable state
export { globalCounter, globalCache, globalUser };
