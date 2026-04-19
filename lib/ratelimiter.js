//1. create a map
//2. run the function
//3. declare window time, max request
//4. check if you already have map which has current ip
//5. get array for last window time seconds
//6. if already exceeding limit, return false, and left limit 0
//. if not push it in array
//return  allowed  true

const requestMap = new Map()

export function ratelimiter(options = {}) {
    const window = options.window || 60*1000;
    const maxRequest = options.maxRequest || 5;

    return function checkLimit(ip){
        const now = Date.now();
        if(!requestMap.has(ip)){
            requestMap.set(ip, []);
        }
        const timestamps = requestMap.get(ip);
        //filter out those who are in last 60 second
        const valid = timestamps.filter(t => now-t < window);

        //if valid array has length greater than limit, return false
        if(valid.length >= maxRequest){
            return {
                allowed: false
            }
        }
        valid.push(now);
        requestMap.set(ip, valid);
        return {
            allowed: true
        }
    }
}