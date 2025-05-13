function numFibo(n) {
    if (n <= 1) return n;
    
    let a = 0, b = 1, fib;
    for (let i = 2; i <= n; i++) {
        fib = a + b;
        a = b;
        b = fib;
    }
    return b;
}

console.log(numFibo(10)); 