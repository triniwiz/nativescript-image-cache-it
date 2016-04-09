'use strict'
const app = require("application");
const Picasso = com.squareup.picasso.Picasso;
function ImageCacheIt() {
    if (app.android) {
        this.picasso = Picasso.with(app.android.currentContext);
    }
}
module.exports = ImageCacheIt;