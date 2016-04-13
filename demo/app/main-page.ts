import * as observable from 'data/observable';
import * as pages from 'ui/page';
import {HelloWorldModel} from './main-view-model';
import * as view from 'ui/core/view';
import {StackLayout} from 'ui/layouts/stack-layout';
import {Image} from 'ui/image';
// Event handler for Page "loaded" event attached in main-page.xml
let model: HelloWorldModel = new HelloWorldModel();
let page;
let sl;
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = model;
    sl = <StackLayout>page.getViewById("sl");
    for (let i = 0; i < model.list.length; i++) {
        let view = page.bindingContext.cacheIt(model.list[i].url);
        sl.addChild(view)
    }

}

