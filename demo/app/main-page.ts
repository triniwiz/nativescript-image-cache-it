import * as observable from 'tns-core-modules/data/observable';
import * as pages from 'tns-core-modules/ui/page';
import { HelloWorldModel } from './main-view-model';
// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    page.bindingContext = new HelloWorldModel();
}


export function onTapEven(event) {
    console.log('even tapped ' + Date.now());
}

export function onTapOdd(event) {
    console.log('odd tapped ' + Date.now());
}
