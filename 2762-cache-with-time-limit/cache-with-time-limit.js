var TimeLimitedCache = function() {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const now = Date.now();
    const existingEntry = this.cache.get(key);

    if (existingEntry && existingEntry.expiry > now) {
        clearTimeout(existingEntry.timeout);
        this.cache.set(key, {
            value,
            expiry: now + duration,
            timeout: setTimeout(() => this.cache.delete(key), duration)
        });
        return true;
    }

    this.cache.set(key, {
        value,
        expiry: now + duration,
        timeout: setTimeout(() => this.cache.delete(key), duration)
    });

    return false;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
     const now = Date.now();
    const entry = this.cache.get(key);

    if (entry && entry.expiry > now) {
        return entry.value;
    }

    return -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    const now = Date.now();
    let count = 0;

    for (const [key, entry] of this.cache.entries()) {
        if (entry.expiry > now) {
            count++;
        } else {
            this.cache.delete(key);
        }
    }

    return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */