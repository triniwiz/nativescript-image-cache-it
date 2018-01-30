var ImageCacheIt = require("nativescript-image-cache-it").ImageCacheIt;
var imageCacheIt = new ImageCacheIt();

describe("greet function", function() {
    it("exists", function() {
        expect(imageCacheIt.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(imageCacheIt.greet()).toEqual("Hello, NS");
    });
});