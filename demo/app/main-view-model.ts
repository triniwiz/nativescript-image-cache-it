import {Observable} from 'data/observable';
import ImageCacheIt = require('nativescript-image-cache-it');
import app = require("application");
import utils = require('utils/utils');
import fs = require("file-system");
let heros = [{ id: "hulk", url: "http://static.comicvine.com/uploads/original/14/146991/3330532-5700980774-aveng.jpg" }
    , { id: "ca", url: "http://media.ignimgs.com/media/ign/imgs/minisites/topN/comic-book-heroes/6_CaptainAmerica.jpg" }
    , { id: "im", url: "http://www.pixelstalk.net/wp-content/uploads/2015/12/Iron-Man-Comic-Book-Wallpaper.jpg" }
    , { id: "thor", url: "http://adventureamigos.net/wp-content/uploads/2015/04/rsz_thor-artwork-comics-hd-wallpaper-hq-desktop-thor-comic-wallpaper-hd-free-download-for-android-wallpapers-screensavers-ipad-iphone-1680x1050.jpg" }
    , { id: "he", url: "http://screenrant.com/wp-content/uploads/Hawkeye-Marvel-Comics-Classic-Costume.jpg" }
    , { id: "bw", url: "http://vignette4.wikia.nocookie.net/marveldatabase/images/d/de/Natalia_Romanova_(Earth-12131)_007.png" }
    , { id: "falcon", url: "http://source.superherostuff.com/wp-content/uploads/2015/09/Falcon_AA_Promo_Render_.png" }];
export class HelloWorldModel extends Observable {
    constructor() {
        super();
        this.set("list", heros);
    }

    cacheIt(view, image) {
        const cache = new ImageCacheIt();
        cache.load(image)
            .placeholder("~/assets/images/broken.png")
            .error("~/assets/images/ph.png")
            .resize(300, 300)
            .into(view)

    }
}
