import * as observable from 'data/observable';
import * as pages from 'ui/page';
import {HelloWorldModel} from './main-view-model';
import * as view from 'ui/core/view';
import {StackLayout} from 'ui/layouts/stack-layout';
import {Image} from 'ui/image';
// Event handler for Page "loaded" event attached in main-page.xml
let model= new HelloWorldModel();
let page;
let sl;
export function pageLoaded(args: observable.EventData) {
    page = <pages.Page>args.object;
    page.bindingContext = model;
}

export function addImage() {
model.addImage()
}