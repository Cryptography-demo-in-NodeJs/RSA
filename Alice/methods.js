const getPrimitiveRoot = (prime) => {

    for(let i = 2; i < prime ; i++) {
        let x = 1; 
        let st = new Set(); 
        for(let j = 1; j < prime; j++) { 
            x = x * i ; 
            st.add(x % prime); 
        }
        if(st.size === prime - 1){ 
            return i; 
        }
    }
    return -1; 
}

const poww = (x,y,m) => {

    if(y === 0) return 1; 
    let ans = 1; 
    let hy = Math.floor(y/2);
    let a = poww(x,hy,m); 
   
    if(y%2) {
        ans = ( (( a * a ) % m) * x ) % m;  
    } else {
        ans = ( a * a ) % m; 
    }
    //console.log(y,ans); 
    return ans;
}

const powerMod = (a, b, m) => { // g^a % p 
    let ans = poww(a, b, m);
    return ans; 
}


const isPrime = (n) =>{
    if(n === 2) {
        return 1; 
    }

    let y = Math.floor(Math.sqrt(n)); 
    for(let i=2; i <= y; i++){
        if(n%i === 0){
            return 0; 
        }
    }

    return 1; 
}

function getRandomInt(max) { // return [0,max-1] 
    return Math.floor(Math.random() * max); 
}
  
let getRandom = (x,y) => { // inclusive x and y
    let z = getRandomInt(y+1); 
    if(z >= x) return z;
    else return getRandom(x,y); 
}

function modInverse(a, m)
{
    for(let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
}

const isCoprime = (x,y) => {
    for(let i=2; i<y; i++){
        if(x%i==0 && y%i==0){
            return 0; 
        }
    }
    return 1; 
}

module.exports = { 
    getPrimitiveRoot,
    powerMod,
    getRandom,
    modInverse,
    isPrime,
    isCoprime
}; 