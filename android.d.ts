/// <reference path="./_helpers.d.ts" />
import javalangObject = java.lang.Object;
import javalangrefReferenceQueue = java.lang.ref.ReferenceQueue;
/// <reference path="./com.squareup.picasso.Action.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.ref.ReferenceQueue.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export abstract class Action {
			}
			export module Action {
				export class RequestWeakReference {
					public constructor(param0: com.squareup.picasso.Action, param1: javalangObject, param2: javalangrefReferenceQueue);
				}
			}
		}
	}
}

import androidcontentContext = android.content.Context;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.squareup.picasso.Request.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class AssetRequestHandler extends com.squareup.picasso.RequestHandler {
				public static ANDROID_ASSET: string;
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
				public constructor(param0: androidcontentContext);
				public constructor();
			}
		}
	}
}

declare module com {
	export module squareup {
		export module picasso {
			export class BitmapHunter {
				public run(): void;
			}
		}
	}
}

import androidgraphicsBitmap = android.graphics.Bitmap;
/// <reference path="./android.graphics.Bitmap.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Cache {
				/**
				 * Constructs a new instance of the com.squareup.picasso.Cache interface with the provided implementation.
				 */
				public constructor(implementation: {
					get(param0: string): androidgraphicsBitmap;
					set(param0: string, param1: androidgraphicsBitmap): void;
					size(): number;
					maxSize(): number;
					clear(): void;
					clearKeyUri(param0: string): void;
					<clinit>(): void;
				});
				public static NONE: com.squareup.picasso.Cache;
				public maxSize(): number;
				public set(param0: string, param1: androidgraphicsBitmap): void;
				public clear(): void;
				public get(param0: string): androidgraphicsBitmap;
				public clearKeyUri(param0: string): void;
				public size(): number;
			}
		}
	}
}

declare module com {
	export module squareup {
		export module picasso {
			export class Callback {
				/**
				 * Constructs a new instance of the com.squareup.picasso.Callback interface with the provided implementation.
				 */
				public constructor(implementation: {
					onSuccess(): void;
					onError(): void;
				});
				public onError(): void;
				public onSuccess(): void;
			}
			export module Callback {
				export class EmptyCallback {
					public constructor();
					public onSuccess(): void;
					public onError(): void;
				}
			}
		}
	}
}

/// <reference path="./com.squareup.picasso.Request.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class ContactsPhotoRequestHandler extends com.squareup.picasso.RequestHandler {
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
			}
			export module ContactsPhotoRequestHandler {
				export class ContactPhotoStreamIcs {
				}
			}
		}
	}
}

/// <reference path="./com.squareup.picasso.Request.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class ContentStreamRequestHandler extends com.squareup.picasso.RequestHandler {
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
			}
		}
	}
}

declare module com {
	export module squareup {
		export module picasso {
			export class DeferredRequestCreator {
				public onPreDraw(): boolean;
			}
		}
	}
}

import androidosLooper = android.os.Looper;
import androidosMessage = android.os.Message;
import androidcontentIntent = android.content.Intent;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.Intent.d.ts" />
/// <reference path="./android.os.Looper.d.ts" />
/// <reference path="./android.os.Message.d.ts" />
/// <reference path="./com.squareup.picasso.Dispatcher.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Dispatcher {
			}
			export module Dispatcher {
				export class DispatcherHandler {
					public constructor(param0: androidosLooper, param1: com.squareup.picasso.Dispatcher);
					public handleMessage(param0: androidosMessage): void;
				}
				export class DispatcherThread {
				}
				export class NetworkBroadcastReceiver {
					public onReceive(param0: androidcontentContext, param1: androidcontentIntent): void;
				}
			}
		}
	}
}

import androidnetUri = android.net.Uri;
import javaioInputStream = java.io.InputStream;
/// <reference path="./android.graphics.Bitmap.d.ts" />
/// <reference path="./android.net.Uri.d.ts" />
/// <reference path="./java.io.InputStream.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Downloader {
				/**
				 * Constructs a new instance of the com.squareup.picasso.Downloader interface with the provided implementation.
				 */
				public constructor(implementation: {
					load(param0: androidnetUri, param1: number): com.squareup.picasso.Downloader.Response;
					shutdown(): void;
				});
				public shutdown(): void;
				public load(param0: androidnetUri, param1: number): com.squareup.picasso.Downloader.Response;
			}
			export module Downloader {
				export class Response {
					public constructor(param0: androidgraphicsBitmap, param1: boolean, param2: number);
					public getBitmap(): androidgraphicsBitmap;
					public getInputStream(): javaioInputStream;
					public constructor(param0: javaioInputStream, param1: boolean, param2: number);
					public constructor(param0: javaioInputStream, param1: boolean);
					public constructor(param0: androidgraphicsBitmap, param1: boolean);
					public getContentLength(): number;
				}
				export class ResponseException {
					public constructor(param0: string, param1: number, param2: number);
				}
			}
		}
	}
}

declare module com {
	export module squareup {
		export module picasso {
			export class FetchAction extends com.squareup.picasso.Action {
			}
		}
	}
}

/// <reference path="./com.squareup.picasso.Request.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class FileRequestHandler extends com.squareup.picasso.ContentStreamRequestHandler {
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
			}
		}
	}
}

declare module com {
	export module squareup {
		export module picasso {
			export class GetAction extends com.squareup.picasso.Action {
				public error(): void;
			}
		}
	}
}

/// <reference path="./android.graphics.Bitmap.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class ImageViewAction extends com.squareup.picasso.Action {
				public error(): void;
				public complete(param0: androidgraphicsBitmap, param1: com.squareup.picasso.Picasso.LoadedFrom): void;
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.Bitmap.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class LruCache {
				public evictionCount(): number;
				public missCount(): number;
				public get(param0: string): androidgraphicsBitmap;
				public size(): number;
				public maxSize(): number;
				public set(param0: string, param1: androidgraphicsBitmap): void;
				public clear(): void;
				public constructor(param0: number);
				public putCount(): number;
				public evictAll(): void;
				public constructor(param0: androidcontentContext);
				public hitCount(): number;
				public clearKeyUri(param0: string): void;
			}
		}
	}
}

/// <reference path="./java.io.InputStream.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class MarkableInputStream {
				public markSupported(): boolean;
				public close(): void;
				public read(param0: native.Array<number>, param1: number, param2: number): number;
				public constructor(param0: javaioInputStream, param1: number);
				public constructor(param0: javaioInputStream);
				public reset(): void;
				public reset(param0: number): void;
				public read(): number;
				public skip(param0: number): number;
				public savePosition(param0: number): number;
				public read(param0: native.Array<number>): number;
				public available(): number;
				public mark(param0: number): void;
			}
		}
	}
}

/// <reference path="./com.squareup.picasso.Request.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class MediaStoreRequestHandler extends com.squareup.picasso.ContentStreamRequestHandler {
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
			}
			export module MediaStoreRequestHandler {
				export class PicassoKind {
					public static MICRO: com.squareup.picasso.MediaStoreRequestHandler.PicassoKind;
					public static MINI: com.squareup.picasso.MediaStoreRequestHandler.PicassoKind;
					public static FULL: com.squareup.picasso.MediaStoreRequestHandler.PicassoKind;
					public static valueOf(param0: string): com.squareup.picasso.MediaStoreRequestHandler.PicassoKind;
					public static values(): native.Array<com.squareup.picasso.MediaStoreRequestHandler.PicassoKind>;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class MemoryPolicy {
				public static NO_CACHE: com.squareup.picasso.MemoryPolicy;
				public static NO_STORE: com.squareup.picasso.MemoryPolicy;
				public static valueOf(param0: string): com.squareup.picasso.MemoryPolicy;
				public static values(): native.Array<com.squareup.picasso.MemoryPolicy>;
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class NetworkPolicy {
				public static NO_CACHE: com.squareup.picasso.NetworkPolicy;
				public static NO_STORE: com.squareup.picasso.NetworkPolicy;
				public static OFFLINE: com.squareup.picasso.NetworkPolicy;
				public static values(): native.Array<com.squareup.picasso.NetworkPolicy>;
				public static shouldReadFromDiskCache(param0: number): boolean;
				public static shouldWriteToDiskCache(param0: number): boolean;
				public static isOfflineOnly(param0: number): boolean;
				public static valueOf(param0: string): com.squareup.picasso.NetworkPolicy;
			}
		}
	}
}

/// <reference path="./com.squareup.picasso.Downloader.d.ts" />
/// <reference path="./com.squareup.picasso.Request.d.ts" />
/// <reference path="./com.squareup.picasso.Stats.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class NetworkRequestHandler extends com.squareup.picasso.RequestHandler {
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
				public constructor(param0: com.squareup.picasso.Downloader, param1: com.squareup.picasso.Stats);
				public constructor();
			}
			export module NetworkRequestHandler {
				export class ContentLengthException {
					public constructor(param0: string);
				}
			}
		}
	}
}

import javaioFile = java.io.File;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.net.Uri.d.ts" />
/// <reference path="./com.squareup.okhttp.OkHttpClient.d.ts" />
/// <reference path="./java.io.File.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class OkHttpDownloader {
				public shutdown(): void;
				public constructor(param0: com.squareup.okhttp.OkHttpClient);
				public constructor(param0: javaioFile);
				public getClient(): com.squareup.okhttp.OkHttpClient;
				public load(param0: androidnetUri, param1: number): com.squareup.picasso.Downloader.Response;
				public constructor(param0: androidcontentContext);
				public constructor(param0: javaioFile, param1: number);
				public constructor(param0: androidcontentContext, param1: number);
			}
		}
	}
}

import androidwidgetImageView = android.widget.ImageView;
import androidwidgetRemoteViews = android.widget.RemoteViews;
import androidgraphicsBitmapConfig = android.graphics.Bitmap.Config;
import javautilconcurrentExecutorService = java.util.concurrent.ExecutorService;
import javalangException = java.lang.Exception;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.net.Uri.d.ts" />
/// <reference path="./android.widget.ImageView.d.ts" />
/// <reference path="./android.widget.RemoteViews.d.ts" />
/// <reference path="./com.squareup.picasso.Cache.d.ts" />
/// <reference path="./com.squareup.picasso.Downloader.d.ts" />
/// <reference path="./com.squareup.picasso.Picasso.d.ts" />
/// <reference path="./com.squareup.picasso.Request.d.ts" />
/// <reference path="./com.squareup.picasso.RequestCreator.d.ts" />
/// <reference path="./com.squareup.picasso.RequestHandler.d.ts" />
/// <reference path="./com.squareup.picasso.StatsSnapshot.d.ts" />
/// <reference path="./com.squareup.picasso.Target.d.ts" />
/// <reference path="./java.io.File.d.ts" />
/// <reference path="./java.lang.Exception.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.concurrent.ExecutorService.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Picasso {
				public resumeTag(param0: javalangObject): void;
				public invalidate(param0: javaioFile): void;
				public load(param0: javaioFile): com.squareup.picasso.RequestCreator;
				public cancelRequest(param0: androidwidgetImageView): void;
				public cancelRequest(param0: com.squareup.picasso.Target): void;
				public cancelRequest(param0: androidwidgetRemoteViews, param1: number): void;
				public cancelTag(param0: javalangObject): void;
				public load(param0: number): com.squareup.picasso.RequestCreator;
				public getSnapshot(): com.squareup.picasso.StatsSnapshot;
				public isLoggingEnabled(): boolean;
				public setLoggingEnabled(param0: boolean): void;
				public static setSingletonInstance(param0: com.squareup.picasso.Picasso): void;
				public shutdown(): void;
				public pauseTag(param0: javalangObject): void;
				public load(param0: string): com.squareup.picasso.RequestCreator;
				public areIndicatorsEnabled(): boolean;
				public invalidate(param0: string): void;
				public setDebugging(param0: boolean): void;
				public setIndicatorsEnabled(param0: boolean): void;
				public isDebugging(): boolean;
				public load(param0: androidnetUri): com.squareup.picasso.RequestCreator;
				public invalidate(param0: androidnetUri): void;
				public static with(param0: androidcontentContext): com.squareup.picasso.Picasso;
			}
			export module Picasso {
				export class Builder {
					public listener(param0: com.squareup.picasso.Picasso.Listener): com.squareup.picasso.Picasso.Builder;
					public build(): com.squareup.picasso.Picasso;
					public defaultBitmapConfig(param0: androidgraphicsBitmapConfig): com.squareup.picasso.Picasso.Builder;
					public executor(param0: javautilconcurrentExecutorService): com.squareup.picasso.Picasso.Builder;
					public requestTransformer(param0: com.squareup.picasso.Picasso.RequestTransformer): com.squareup.picasso.Picasso.Builder;
					public debugging(param0: boolean): com.squareup.picasso.Picasso.Builder;
					public downloader(param0: com.squareup.picasso.Downloader): com.squareup.picasso.Picasso.Builder;
					public constructor(param0: androidcontentContext);
					public addRequestHandler(param0: com.squareup.picasso.RequestHandler): com.squareup.picasso.Picasso.Builder;
					public memoryCache(param0: com.squareup.picasso.Cache): com.squareup.picasso.Picasso.Builder;
					public loggingEnabled(param0: boolean): com.squareup.picasso.Picasso.Builder;
					public indicatorsEnabled(param0: boolean): com.squareup.picasso.Picasso.Builder;
				}
				export class CleanupThread {
					public run(): void;
				}
				export class Listener {
					/**
					 * Constructs a new instance of the com.squareup.picasso.Picasso$Listener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onImageLoadFailed(param0: com.squareup.picasso.Picasso, param1: androidnetUri, param2: javalangException): void;
					});
					public onImageLoadFailed(param0: com.squareup.picasso.Picasso, param1: androidnetUri, param2: javalangException): void;
				}
				export class LoadedFrom {
					public static MEMORY: com.squareup.picasso.Picasso.LoadedFrom;
					public static DISK: com.squareup.picasso.Picasso.LoadedFrom;
					public static NETWORK: com.squareup.picasso.Picasso.LoadedFrom;
					public static values(): native.Array<com.squareup.picasso.Picasso.LoadedFrom>;
					public static valueOf(param0: string): com.squareup.picasso.Picasso.LoadedFrom;
				}
				export class Priority {
					public static LOW: com.squareup.picasso.Picasso.Priority;
					public static NORMAL: com.squareup.picasso.Picasso.Priority;
					public static HIGH: com.squareup.picasso.Picasso.Priority;
					public static values(): native.Array<com.squareup.picasso.Picasso.Priority>;
					public static valueOf(param0: string): com.squareup.picasso.Picasso.Priority;
				}
				export class RequestTransformer {
					/**
					 * Constructs a new instance of the com.squareup.picasso.Picasso$RequestTransformer interface with the provided implementation.
					 */
					public constructor(implementation: {
						transformRequest(param0: com.squareup.picasso.Request): com.squareup.picasso.Request;
						<clinit>(): void;
					});
					public static IDENTITY: com.squareup.picasso.Picasso.RequestTransformer;
					public transformRequest(param0: com.squareup.picasso.Request): com.squareup.picasso.Request;
				}
			}
		}
	}
}

import androidgraphicsCanvas = android.graphics.Canvas;
import androidgraphicsColorFilter = android.graphics.ColorFilter;
import androidgraphicsRect = android.graphics.Rect;
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.ColorFilter.d.ts" />
/// <reference path="./android.graphics.Rect.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class PicassoDrawable {
				public setColorFilter(param0: androidgraphicsColorFilter): void;
				public draw(param0: androidgraphicsCanvas): void;
				public setAlpha(param0: number): void;
				public onBoundsChange(param0: androidgraphicsRect): void;
			}
		}
	}
}

import javalangRunnable = java.lang.Runnable;
import javautilconcurrentFuture = java.util.concurrent.Future;
/// <reference path="./com.squareup.picasso.BitmapHunter.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.util.concurrent.Future.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class PicassoExecutorService {
				public submit(param0: javalangRunnable): javautilconcurrentFuture;
			}
			export module PicassoExecutorService {
				export class PicassoFutureTask {
					public constructor(param0: com.squareup.picasso.BitmapHunter);
					public compareTo(param0: com.squareup.picasso.PicassoExecutorService.PicassoFutureTask): number;
				}
			}
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export abstract class RemoteViewsAction extends com.squareup.picasso.Action {
				public error(): void;
			}
			export module RemoteViewsAction {
				export class AppWidgetAction extends com.squareup.picasso.RemoteViewsAction {
				}
				export class NotificationAction extends com.squareup.picasso.RemoteViewsAction {
				}
				export class RemoteViewsTarget {
					public equals(param0: javalangObject): boolean;
					public hashCode(): number;
				}
			}
		}
	}
}

import javautilList = java.util.List;
/// <reference path="./android.net.Uri.d.ts" />
/// <reference path="./com.squareup.picasso.Request.d.ts" />
/// <reference path="./com.squareup.picasso.Transformation.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Request {
				public uri: androidnetUri;
				public resourceId: number;
				public stableKey: string;
				public transformations: javautilList;
				public targetWidth: number;
				public targetHeight: number;
				public centerCrop: boolean;
				public centerInside: boolean;
				public onlyScaleDown: boolean;
				public rotationDegrees: number;
				public rotationPivotX: number;
				public rotationPivotY: number;
				public hasRotationPivot: boolean;
				public config: androidgraphicsBitmapConfig;
				public priority: com.squareup.picasso.Picasso.Priority;
				public hasSize(): boolean;
				public toString(): string;
				public buildUpon(): com.squareup.picasso.Request.Builder;
			}
			export module Request {
				export class Builder {
					public constructor(param0: androidnetUri);
					public onlyScaleDown(): com.squareup.picasso.Request.Builder;
					public resize(param0: number, param1: number): com.squareup.picasso.Request.Builder;
					public centerCrop(): com.squareup.picasso.Request.Builder;
					public build(): com.squareup.picasso.Request;
					public clearCenterCrop(): com.squareup.picasso.Request.Builder;
					public transform(param0: com.squareup.picasso.Transformation): com.squareup.picasso.Request.Builder;
					public transform(param0: javautilList): com.squareup.picasso.Request.Builder;
					public centerInside(): com.squareup.picasso.Request.Builder;
					public clearOnlyScaleDown(): com.squareup.picasso.Request.Builder;
					public priority(param0: com.squareup.picasso.Picasso.Priority): com.squareup.picasso.Request.Builder;
					public stableKey(param0: string): com.squareup.picasso.Request.Builder;
					public config(param0: androidgraphicsBitmapConfig): com.squareup.picasso.Request.Builder;
					public clearRotation(): com.squareup.picasso.Request.Builder;
					public setResourceId(param0: number): com.squareup.picasso.Request.Builder;
					public clearCenterInside(): com.squareup.picasso.Request.Builder;
					public clearResize(): com.squareup.picasso.Request.Builder;
					public rotate(param0: number, param1: number, param2: number): com.squareup.picasso.Request.Builder;
					public constructor(param0: number);
					public rotate(param0: number): com.squareup.picasso.Request.Builder;
					public setUri(param0: androidnetUri): com.squareup.picasso.Request.Builder;
				}
			}
		}
	}
}

import androidgraphicsdrawableDrawable = android.graphics.drawable.Drawable;
import androidappNotification = android.app.Notification;
/// <reference path="./android.app.Notification.d.ts" />
/// <reference path="./android.graphics.Bitmap.d.ts" />
/// <reference path="./android.graphics.drawable.Drawable.d.ts" />
/// <reference path="./android.widget.ImageView.d.ts" />
/// <reference path="./android.widget.RemoteViews.d.ts" />
/// <reference path="./com.squareup.picasso.Callback.d.ts" />
/// <reference path="./com.squareup.picasso.MemoryPolicy.d.ts" />
/// <reference path="./com.squareup.picasso.NetworkPolicy.d.ts" />
/// <reference path="./com.squareup.picasso.Target.d.ts" />
/// <reference path="./com.squareup.picasso.Transformation.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class RequestCreator {
				public placeholder(param0: number): com.squareup.picasso.RequestCreator;
				public fetch(param0: com.squareup.picasso.Callback): void;
				public error(param0: number): com.squareup.picasso.RequestCreator;
				public resize(param0: number, param1: number): com.squareup.picasso.RequestCreator;
				public stableKey(param0: string): com.squareup.picasso.RequestCreator;
				public noPlaceholder(): com.squareup.picasso.RequestCreator;
				public placeholder(param0: androidgraphicsdrawableDrawable): com.squareup.picasso.RequestCreator;
				public fit(): com.squareup.picasso.RequestCreator;
				public config(param0: androidgraphicsBitmapConfig): com.squareup.picasso.RequestCreator;
				public priority(param0: com.squareup.picasso.Picasso.Priority): com.squareup.picasso.RequestCreator;
				public get(): androidgraphicsBitmap;
				public error(param0: androidgraphicsdrawableDrawable): com.squareup.picasso.RequestCreator;
				public fetch(): void;
				public rotate(param0: number, param1: number, param2: number): com.squareup.picasso.RequestCreator;
				public tag(param0: javalangObject): com.squareup.picasso.RequestCreator;
				public transform(param0: javautilList): com.squareup.picasso.RequestCreator;
				public centerCrop(): com.squareup.picasso.RequestCreator;
				public noFade(): com.squareup.picasso.RequestCreator;
				public transform(param0: com.squareup.picasso.Transformation): com.squareup.picasso.RequestCreator;
				public into(param0: androidwidgetImageView, param1: com.squareup.picasso.Callback): void;
				public onlyScaleDown(): com.squareup.picasso.RequestCreator;
				public into(param0: androidwidgetRemoteViews, param1: number, param2: number, param3: androidappNotification): void;
				public into(param0: androidwidgetImageView): void;
				public skipMemoryCache(): com.squareup.picasso.RequestCreator;
				public networkPolicy(param0: com.squareup.picasso.NetworkPolicy, param1: native.Array<com.squareup.picasso.NetworkPolicy>): com.squareup.picasso.RequestCreator;
				public into(param0: com.squareup.picasso.Target): void;
				public rotate(param0: number): com.squareup.picasso.RequestCreator;
				public centerInside(): com.squareup.picasso.RequestCreator;
				public memoryPolicy(param0: com.squareup.picasso.MemoryPolicy, param1: native.Array<com.squareup.picasso.MemoryPolicy>): com.squareup.picasso.RequestCreator;
				public resizeDimen(param0: number, param1: number): com.squareup.picasso.RequestCreator;
				public into(param0: androidwidgetRemoteViews, param1: number, param2: native.Array<number>): void;
			}
		}
	}
}

/// <reference path="./android.graphics.Bitmap.d.ts" />
/// <reference path="./com.squareup.picasso.Request.d.ts" />
/// <reference path="./java.io.InputStream.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export abstract class RequestHandler {
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
				public constructor();
			}
			export module RequestHandler {
				export class Result {
					public getBitmap(): androidgraphicsBitmap;
					public constructor(param0: javaioInputStream, param1: com.squareup.picasso.Picasso.LoadedFrom);
					public getLoadedFrom(): com.squareup.picasso.Picasso.LoadedFrom;
					public getStream(): javaioInputStream;
					public constructor(param0: androidgraphicsBitmap, param1: com.squareup.picasso.Picasso.LoadedFrom);
				}
			}
		}
	}
}

/// <reference path="./com.squareup.picasso.Request.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class ResourceRequestHandler extends com.squareup.picasso.RequestHandler {
				public canHandleRequest(param0: com.squareup.picasso.Request): boolean;
				public load(param0: com.squareup.picasso.Request, param1: number): com.squareup.picasso.RequestHandler.Result;
			}
		}
	}
}

/// <reference path="./android.os.Looper.d.ts" />
/// <reference path="./android.os.Message.d.ts" />
/// <reference path="./com.squareup.picasso.Stats.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Stats {
			}
			export module Stats {
				export class StatsHandler {
					public constructor(param0: androidosLooper, param1: com.squareup.picasso.Stats);
					public handleMessage(param0: androidosMessage): void;
				}
			}
		}
	}
}

import javaioPrintWriter = java.io.PrintWriter;
/// <reference path="./java.io.PrintWriter.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class StatsSnapshot {
				public maxSize: number;
				public size: number;
				public cacheHits: number;
				public cacheMisses: number;
				public totalDownloadSize: number;
				public totalOriginalBitmapSize: number;
				public totalTransformedBitmapSize: number;
				public averageDownloadSize: number;
				public averageOriginalBitmapSize: number;
				public averageTransformedBitmapSize: number;
				public downloadCount: number;
				public originalBitmapCount: number;
				public transformedBitmapCount: number;
				public timeStamp: number;
				public constructor(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: number, param10: number, param11: number, param12: number, param13: number);
				public dump(param0: javaioPrintWriter): void;
				public dump(): void;
				public toString(): string;
			}
		}
	}
}

/// <reference path="./android.graphics.Bitmap.d.ts" />
/// <reference path="./android.graphics.drawable.Drawable.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Target {
				/**
				 * Constructs a new instance of the com.squareup.picasso.Target interface with the provided implementation.
				 */
				public constructor(implementation: {
					onBitmapLoaded(param0: androidgraphicsBitmap, param1: com.squareup.picasso.Picasso.LoadedFrom): void;
					onBitmapFailed(param0: androidgraphicsdrawableDrawable): void;
					onPrepareLoad(param0: androidgraphicsdrawableDrawable): void;
				});
				public onBitmapLoaded(param0: androidgraphicsBitmap, param1: com.squareup.picasso.Picasso.LoadedFrom): void;
				public onBitmapFailed(param0: androidgraphicsdrawableDrawable): void;
				public onPrepareLoad(param0: androidgraphicsdrawableDrawable): void;
			}
		}
	}
}

declare module com {
	export module squareup {
		export module picasso {
			export class TargetAction extends com.squareup.picasso.Action {
			}
		}
	}
}

/// <reference path="./android.graphics.Bitmap.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Transformation {
				/**
				 * Constructs a new instance of the com.squareup.picasso.Transformation interface with the provided implementation.
				 */
				public constructor(implementation: {
					transform(param0: androidgraphicsBitmap): androidgraphicsBitmap;
					key(): string;
				});
				public transform(param0: androidgraphicsBitmap): androidgraphicsBitmap;
				public key(): string;
			}
		}
	}
}

import javanetHttpURLConnection = java.net.HttpURLConnection;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.net.Uri.d.ts" />
/// <reference path="./java.net.HttpURLConnection.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class UrlConnectionDownloader {
				public openConnection(param0: androidnetUri): javanetHttpURLConnection;
				public shutdown(): void;
				public load(param0: androidnetUri, param1: number): com.squareup.picasso.Downloader.Response;
				public constructor(param0: androidcontentContext);
			}
			export module UrlConnectionDownloader {
				export class ResponseCacheIcs {
				}
			}
		}
	}
}

import javalangThread = java.lang.Thread;
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.lang.Thread.d.ts" />
declare module com {
	export module squareup {
		export module picasso {
			export class Utils {
			}
			export module Utils {
				export class ActivityManagerHoneycomb {
				}
				export class BitmapHoneycombMR1 {
				}
				export class OkHttpLoaderCreator {
				}
				export class PicassoThread {
					public run(): void;
					public constructor(param0: javalangRunnable);
				}
				export class PicassoThreadFactory {
					public newThread(param0: javalangRunnable): javalangThread;
				}
			}
		}
	}
}

