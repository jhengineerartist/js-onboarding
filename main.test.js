import { expect, test } from 'vitest';

import { LRUCache } from './algorithms/lruCache';

class LRUCacheTestCase {
    constructor(valueToAccess, cacheSize = 0, cacheContents = []) {
        this.valueToAccess = valueToAccess
        this.expectedCacheSize = cacheSize;
        this.expectedCacheContents = cacheContents;
    }
}

test('lruCache basic test', () => {
    let cacheStateExpectations = [
        new LRUCacheTestCase(),
        new LRUCacheTestCase('a', 1, ['a']),
        new LRUCacheTestCase(1, 2, [1, 'a']),
        new LRUCacheTestCase('a', 2, ['a', 1]),
        new LRUCacheTestCase(2, 3, [2, 'a', 1]),
        new LRUCacheTestCase(3, 3, [3, 2, 'a'])
    ]
    let cache = new LRUCache(3);

    for (let testCase of cacheStateExpectations) {
        if (testCase.valueToAccess) {
            let data = cache.access(testCase.valueToAccess)
            expect([data, cache.dataList.length, cache.dataList.contents]).toStrictEqual(
                [testCase.valueToAccess, testCase.expectedCacheSize, testCase.expectedCacheContents])
        }
    }
})