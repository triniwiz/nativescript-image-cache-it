import {Observable} from 'data/observable';
import {ObservableArray} from 'data/observable-array';
import {ImageCacheIt} from 'nativescript-image-cache-it';
import app = require("application");
import utils = require('utils/utils');
import fs = require("file-system");
export class HelloWorldModel extends Observable {
    public images;
    public newImg: string;
    constructor() {
        super();
        this.images = new ObservableArray([
            {url:"http://i.kinja-img.com/gawker-media/image/upload/arjw8wqvwnihalb6fq3k.png"},
            {url:"http://i.imgur.com/gHkiBKr.jpg"},
            {url:"https://images.alphacoders.com/112/112131.jpg"},
            {url:"http://screenrant.com/wp-content/uploads/flash-movie-director-writer-grahame-smith.jpg"},
            {url:"http://i.newsarama.com/images/i/000/165/825/i02/Jim_Lee_Superman.jpg?"},
            {url:"http://www.studiocity-macau.com/uploads/images/SC/Entertainment/Batman/batman_share.jpg"},
            {url:"http://media.dcentertainment.com/sites/default/files/GalleryChar_1900x900_Shazam_JLWar_52efe00221d5e8.67242484.jpg"},
            {url:"http://media.dcentertainment.com/sites/default/files/GalleryComics_1920x1080_20150617_WW_Cv41_55775bb30cf485.93762653.jpg"},
            {url:"http://media.dcentertainment.com/sites/default/files/GalleryComics_1920x1080_20150826_CYB_Cv2_55cceb0d8f1d31.28141728.jpg"},
            {url:"http://media.dcentertainment.com/sites/default/files/GalleryChar_1900x900_GL_JLWar_05_52efdf431a6f06.20788146.jpg"},
            {url:"http://media.dcentertainment.com/sites/default/files/GalleryChar_1900x900_aquaman1_04_52ab5de7275bb2.59639997.jpg"},
            {url:"http://i.newsarama.com/images/i/000/146/771/i02/MM_02_CVR_CMYK.jpg?"},
            {url:"http://cdn.hitfix.com/photos/6206789/The-Green-Arrow.jpg"},
            {url:"http://www.cinemablend.com/images/news/32429/_1447230516.jpg"},
            {url:"http://gallery.photo.net/photo/7983112-lg.jpg"},
            {url:"https://images.unsplash.com/photo-1458724338480-79bc7a8352e4"},
            {url:"https://images.unsplash.com/photo-1456318019777-ccdc4d5b2396"},
            {url:"https://images.unsplash.com/photo-1455098934982-64c622c5e066"},
            {url:"https://images.unsplash.com/photo-1454817481404-7e84c1b73b4a"},
            {url:"https://images.unsplash.com/photo-1454982523318-4b6396f39d3a"},
            {url:"https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab"},
            {url:"https://images.unsplash.com/photo-1423768164017-3f27c066407f"},
            {url:"https://images.unsplash.com/photo-1433360405326-e50f909805b3"},
            {url:"https://images.unsplash.com/photo-1421749810611-438cc492b581"},
            {url:"https://images.unsplash.com/photo-1437652010333-fbf2cd02a4f8"},
            {url:"https://images.unsplash.com/photo-1458640904116-093b74971de9"},
            {url:"https://images.unsplash.com/photo-1422393462206-207b0fbd8d6b"},
            {url:"https://images.unsplash.com/photo-1454047637795-79e3325dfa0e"},
            {url:"http://cdn.pcwallart.com/images/spring-nature-wallpapers-high-resolution-wallpaper-4.jpg"},
            {url:"http://gallery.photo.net/photo/11298470-lg.jpg"},
            { url: "http://gallery.photo.net/photo/5602504-md.jpg" },
            { url: "http://gallery.photo.net/photo/9734091-md.jpg" },
            { url: "http://gallery.photo.net/photo/4797337-md.jpg" },
            { url: "http://gallery.photo.net/photo/7141529-md.jpg" },
            { url: "http://gallery.photo.net/photo/7232968-md.jpg" },
            { url: "http://gallery.photo.net/photo/12871773-md.jpg" },
            { url: "http://gallery.photo.net/photo/12721293-md.jpg" },
            { url: "http://gallery.photo.net/photo/6892014-md.jpg" },
            { url: "http://gallery.photo.net/photo/3269153-md.jpg" },
            { url: "http://gallery.photo.net/photo/8189453-md.jpg" },
            { url: 'http://gallery.photo.net/photo/2693222-lg.jpg' },
            { url: "http://gallery.photo.net/photo/3606595-md.jpg" },
            { url: "http://gallery.photo.net/photo/5433159-lg.jpg" },
            { url: "http://gallery.photo.net/photo/6183491-lg.jpg" },
            { url: "http://gallery.photo.net/photo/2747674-md.jpg" },
            { url: "http://gallery.photo.net/photo/8362141-md.jpg" },
            { url: "http://gallery.photo.net/photo/6456351-lg.jpg" },
            { url: "http://gallery.photo.net/photo/4087789-md.jpg" },
            { url: "http://gallery.photo.net/photo/8667486-md.jpg" },
            { url: "http://gallery.photo.net/photo/11014502-md.jpg" },
            { url: "http://gallery.photo.net/photo/8829472-lg.jpg" },
            { url: "http://gallery.photo.net/photo/3536082-md.jpg" },
            { url: "http://gallery.photo.net/photo/10348290-md.jpg" },
            { url: "http://gallery.photo.net/photo/6004788-md.jpg" },
            { url: 'http://gallery.photo.net/photo/5724374-lg.jpg' },
            { url: 'http://gallery.photo.net/photo/9703314-md.jpg' },
            { url: "http://cdn.wonderfulengineering.com/wp-content/uploads/2014/03/high-resolution-wallpapers-25.jpg" },
            { url: "http://gratisography.com/pictures/259_1.jpg" },
            { url: "http://gratisography.com/pictures/248_1.jpg" },
            { url: "http://gratisography.com/pictures/245_1.jpg" },
            { url: "https://www.hdwallpapers.net/previews/lamborghini-centenario-lp770-4-1000.jpg" },
            { url: "http://gratisography.com/pictures/235_1.jpg" },
            { url: "http://gratisography.com/pictures/225_1.jpg" },
            { url: "https://www.hdwallpapers.net/previews/jiraiya-fan-art-naruto-845.jpg" },
            { url: "http://www.planwallpaper.com/static/images/magic-of-blue-universe-images.jpg" },
            { url: "http://cdn.theatlantic.com/assets/media/img/photo/2015/11/images-from-the-2016-sony-world-pho/s01_130921474920553591/main_900.jpg" },
            {url:"http://interrete.org/wp-content/uploads/2014/04/Miniature-World-of-Insects6.png"},
            {url:"http://www.isharearena.com/wp-content/uploads/2012/12/wallpaper-281049.jpg"},
            {url:"http://excellzone.com/wp-content/uploads/2015/06/anime-front.jpg"},
            {url:"http://otakukart.com/animeblog/wp-content/uploads/2015/12/Top-10-Anime-Character-That-Really-Started-From-The-Bottom.png"}
        ]);
        this.newImg = "";
    }

    addImage() {
    this.images.push({ url: this.get("newImg") });
    this.set("newImg","")
    }

}
