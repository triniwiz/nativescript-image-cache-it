import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { ImageCacheIt } from 'nativescript-image-cache-it';

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent implements OnInit {
    item: Item;
    cachedImageUri: string;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        const id = this.route.snapshot.params["id"];
        console.log('Id: ' + id);
        const serviceItem = this.itemService.getItem(id);
        if (serviceItem) {
            this.item = serviceItem;
            // This is just an example of code-side caching. Not necessary in this case.
            try {
                this.cachedImageUri = await ImageCacheIt.getItem(serviceItem.url);
                console.log(`Saved ${serviceItem.url} as ${this.cachedImageUri}.`);
            } catch (exception) {
                console.warn('Error loading url: ', exception);
            }
        }
    }
}
