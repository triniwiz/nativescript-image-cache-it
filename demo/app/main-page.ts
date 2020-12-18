import * as observable from '@nativescript/core/data/observable';
import * as pages from '@nativescript/core/ui/page';
import { HelloWorldModel } from './main-view-model';

let vm: HelloWorldModel;

export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    let page = <pages.Page>args.object;
    vm = new HelloWorldModel();
    page.bindingContext = vm;
}


export function onTapEven(event) {
    console.log('even tapped ' + Date.now());
}

export function onTapOdd(event) {
    console.log('odd tapped ' + Date.now());
}

export function imageLoaded(event) {
    event.object.on('loadStart', (args: any) => {
        console.log('started', args.url);
    });
    /*event.object.on('progress', function (args: any){
        console.log('progress', args.progress);
    });*/
    event.object.on('error', (args: any) => {
       console.log('error', args.message, args.url);
    });
    event.object.on('loadEnd', (args: any) => {
      console.log('ended', args.url);
    });
}

export function onLoadStart(event) {
    console.log('onLoadStart');
}
