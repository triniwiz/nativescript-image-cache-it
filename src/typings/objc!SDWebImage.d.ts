
declare function SDCGColorSpaceGetDeviceRGB(): interop.Unmanaged<any>;

declare function SDCGImageRefContainsAlpha(imageRef: any): boolean;

declare class SDImageCache extends NSObject {

	static alloc(): SDImageCache; // inherited from NSObject

	static new(): SDImageCache; // inherited from NSObject

	static sharedImageCache(): SDImageCache;

	readonly config: SDImageCacheConfig;

	maxMemoryCost: number;

	maxMemoryCountLimit: number;

	constructor(o: { namespace: string; });

	constructor(o: { namespace: string; diskCacheDirectory: string; });

	addReadOnlyCachePath(path: string): void;

	cachePathForKeyInPath(key: string, path: string): string;

	calculateSizeWithCompletionBlock(completionBlock: (p1: number, p2: number) => void): void;

	clearDiskOnCompletion(completion: () => void): void;

	clearMemory(): void;

	defaultCachePathForKey(key: string): string;

	deleteOldFilesWithCompletionBlock(completionBlock: () => void): void;

	diskImageExistsWithKeyCompletion(key: string, completionBlock: (p1: boolean) => void): void;

	getDiskCount(): number;

	getSize(): number;

	imageFromCacheForKey(key: string): UIImage;

	imageFromDiskCacheForKey(key: string): UIImage;

	imageFromMemoryCacheForKey(key: string): UIImage;

	initWithNamespace(ns: string): this;

	initWithNamespaceDiskCacheDirectory(ns: string, directory: string): this;

	makeDiskCachePath(fullNamespace: string): string;

	queryCacheOperationForKeyDone(key: string, doneBlock: (p1: UIImage, p2: NSData, p3: SDImageCacheType) => void): NSOperation;

	removeImageForKeyFromDiskWithCompletion(key: string, fromDisk: boolean, completion: () => void): void;

	removeImageForKeyWithCompletion(key: string, completion: () => void): void;

	storeImageDataToDiskForKey(imageData: NSData, key: string): void;

	storeImageForKeyCompletion(image: UIImage, key: string, completionBlock: () => void): void;

	storeImageForKeyToDiskCompletion(image: UIImage, key: string, toDisk: boolean, completionBlock: () => void): void;

	storeImageImageDataForKeyToDiskCompletion(image: UIImage, imageData: NSData, key: string, toDisk: boolean, completionBlock: () => void): void;
}

declare class SDImageCacheConfig extends NSObject {

	static alloc(): SDImageCacheConfig; // inherited from NSObject

	static new(): SDImageCacheConfig; // inherited from NSObject

	diskCacheReadingOptions: NSDataReadingOptions;

	maxCacheAge: number;

	maxCacheSize: number;

	shouldCacheImagesInMemory: boolean;

	shouldDecompressImages: boolean;

	shouldDisableiCloud: boolean;
}

declare const enum SDImageCacheType {

	None = 0,

	Disk = 1,

	Memory = 2
}

declare const enum SDImageFormat {

	Undefined = -1,

	JPEG = 0,

	PNG = 1,

	GIF = 2,

	TIFF = 3,

	WebP = 4,

	HEIC = 5
}

declare function SDScaledImageForKey(key: string, image: UIImage): UIImage;

interface SDWebImageCoder extends NSObjectProtocol {

	canDecodeFromData(data: NSData): boolean;

	canEncodeToFormat(format: SDImageFormat): boolean;

	decodedImageWithData(data: NSData): UIImage;

	decompressedImageWithImageDataOptions(image: UIImage, data: interop.Pointer | interop.Reference<NSData>, optionsDict: NSDictionary<string, NSObject>): UIImage;

	encodedDataWithImageFormat(image: UIImage, format: SDImageFormat): NSData;
}
declare var SDWebImageCoder: {

	prototype: SDWebImageCoder;
};

declare class SDWebImageCoderHelper extends NSObject {

	static alloc(): SDWebImageCoderHelper; // inherited from NSObject

	static animatedImageWithFrames(frames: NSArray<SDWebImageFrame>): UIImage;

	static exifOrientationFromImageOrientation(imageOrientation: UIImageOrientation): number;

	static framesFromAnimatedImage(animatedImage: UIImage): NSArray<SDWebImageFrame>;

	static imageOrientationFromEXIFOrientation(exifOrientation: number): UIImageOrientation;

	static new(): SDWebImageCoderHelper; // inherited from NSObject
}

declare var SDWebImageCoderScaleDownLargeImagesKey: string;

declare class SDWebImageCodersManager extends NSObject implements SDWebImageCoder {

	static alloc(): SDWebImageCodersManager; // inherited from NSObject

	static new(): SDWebImageCodersManager; // inherited from NSObject

	static sharedInstance(): SDWebImageCodersManager;

	coders: NSArray<any>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	addCoder(coder: SDWebImageCoder): void;

	canDecodeFromData(data: NSData): boolean;

	canEncodeToFormat(format: SDImageFormat): boolean;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	decodedImageWithData(data: NSData): UIImage;

	decompressedImageWithImageDataOptions(image: UIImage, data: interop.Pointer | interop.Reference<NSData>, optionsDict: NSDictionary<string, NSObject>): UIImage;

	encodedDataWithImageFormat(image: UIImage, format: SDImageFormat): NSData;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	removeCoder(coder: SDWebImageCoder): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare var SDWebImageDownloadFinishNotification: string;

declare var SDWebImageDownloadReceiveResponseNotification: string;

declare var SDWebImageDownloadStartNotification: string;

declare var SDWebImageDownloadStartNotificationVar: string;

declare var SDWebImageDownloadStopNotification: string;

declare var SDWebImageDownloadStopNotificationVar: string;

declare class SDWebImageDownloadToken extends NSObject {

	static alloc(): SDWebImageDownloadToken; // inherited from NSObject

	static new(): SDWebImageDownloadToken; // inherited from NSObject

	downloadOperationCancelToken: any;

	url: NSURL;
}

declare class SDWebImageDownloader extends NSObject {

	static alloc(): SDWebImageDownloader; // inherited from NSObject

	static new(): SDWebImageDownloader; // inherited from NSObject

	static sharedDownloader(): SDWebImageDownloader;

	readonly currentDownloadCount: number;

	downloadTimeout: number;

	executionOrder: SDWebImageDownloaderExecutionOrder;

	headersFilter: (p1: NSURL, p2: NSDictionary<string, string>) => NSDictionary<string, string>;

	maxConcurrentDownloads: number;

	password: string;

	readonly sessionConfiguration: NSURLSessionConfiguration;

	shouldDecompressImages: boolean;

	urlCredential: NSURLCredential;

	username: string;

	constructor(o: { sessionConfiguration: NSURLSessionConfiguration; });

	cancel(token: SDWebImageDownloadToken): void;

	cancelAllDownloads(): void;

	createNewSessionWithConfiguration(sessionConfiguration: NSURLSessionConfiguration): void;

	downloadImageWithURLOptionsProgressCompleted(url: NSURL, options: SDWebImageDownloaderOptions, progressBlock: (p1: number, p2: number, p3: NSURL) => void, completedBlock: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void): SDWebImageDownloadToken;

	initWithSessionConfiguration(sessionConfiguration: NSURLSessionConfiguration): this;

	setOperationClass(operationClass: typeof NSObject): void;

	setSuspended(suspended: boolean): void;

	setValueForHTTPHeaderField(value: string, field: string): void;

	valueForHTTPHeaderField(field: string): string;
}

declare const enum SDWebImageDownloaderExecutionOrder {

	FIFOExecutionOrder = 0,

	LIFOExecutionOrder = 1
}

declare class SDWebImageDownloaderOperation extends NSOperation implements NSURLSessionDataDelegate, NSURLSessionTaskDelegate, SDWebImageDownloaderOperationInterface, SDWebImageOperation {

	static alloc(): SDWebImageDownloaderOperation; // inherited from NSObject

	static new(): SDWebImageDownloaderOperation; // inherited from NSObject

	credential: NSURLCredential;

	readonly dataTask: NSURLSessionTask;

	expectedSize: number;

	readonly options: SDWebImageDownloaderOptions;

	readonly request: NSURLRequest;

	response: NSURLResponse;

	shouldDecompressImages: boolean;

	shouldUseCredentialStorage: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { request: NSURLRequest; inSession: NSURLSession; options: SDWebImageDownloaderOptions; }); // inherited from SDWebImageDownloaderOperationInterface

	URLSessionDataTaskDidBecomeDownloadTask(session: NSURLSession, dataTask: NSURLSessionDataTask, downloadTask: NSURLSessionDownloadTask): void;

	URLSessionDataTaskDidBecomeStreamTask(session: NSURLSession, dataTask: NSURLSessionDataTask, streamTask: NSURLSessionStreamTask): void;

	URLSessionDataTaskDidReceiveData(session: NSURLSession, dataTask: NSURLSessionDataTask, data: NSData): void;

	URLSessionDataTaskDidReceiveResponseCompletionHandler(session: NSURLSession, dataTask: NSURLSessionDataTask, response: NSURLResponse, completionHandler: (p1: NSURLSessionResponseDisposition) => void): void;

	URLSessionDataTaskWillCacheResponseCompletionHandler(session: NSURLSession, dataTask: NSURLSessionDataTask, proposedResponse: NSCachedURLResponse, completionHandler: (p1: NSCachedURLResponse) => void): void;

	URLSessionDidBecomeInvalidWithError(session: NSURLSession, error: NSError): void;

	URLSessionDidFinishEventsForBackgroundURLSession(session: NSURLSession): void;

	URLSessionDidReceiveChallengeCompletionHandler(session: NSURLSession, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void): void;

	URLSessionTaskDidCompleteWithError(session: NSURLSession, task: NSURLSessionTask, error: NSError): void;

	URLSessionTaskDidFinishCollectingMetrics(session: NSURLSession, task: NSURLSessionTask, metrics: NSURLSessionTaskMetrics): void;

	URLSessionTaskDidReceiveChallengeCompletionHandler(session: NSURLSession, task: NSURLSessionTask, challenge: NSURLAuthenticationChallenge, completionHandler: (p1: NSURLSessionAuthChallengeDisposition, p2: NSURLCredential) => void): void;

	URLSessionTaskDidSendBodyDataTotalBytesSentTotalBytesExpectedToSend(session: NSURLSession, task: NSURLSessionTask, bytesSent: number, totalBytesSent: number, totalBytesExpectedToSend: number): void;

	URLSessionTaskIsWaitingForConnectivity(session: NSURLSession, task: NSURLSessionTask): void;

	URLSessionTaskNeedNewBodyStream(session: NSURLSession, task: NSURLSessionTask, completionHandler: (p1: NSInputStream) => void): void;

	URLSessionTaskWillBeginDelayedRequestCompletionHandler(session: NSURLSession, task: NSURLSessionTask, request: NSURLRequest, completionHandler: (p1: NSURLSessionDelayedRequestDisposition, p2: NSURLRequest) => void): void;

	URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler(session: NSURLSession, task: NSURLSessionTask, response: NSHTTPURLResponse, request: NSURLRequest, completionHandler: (p1: NSURLRequest) => void): void;

	addHandlersForProgressCompleted(progressBlock: (p1: number, p2: number, p3: NSURL) => void, completedBlock: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void): any;

	cancel(token: any): boolean;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithRequestInSessionOptions(request: NSURLRequest, session: NSURLSession, options: SDWebImageDownloaderOptions): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setCredential(value: NSURLCredential): void;

	setShouldDecompressImages(value: boolean): void;
}

interface SDWebImageDownloaderOperationInterface extends NSObjectProtocol {

	credential: NSURLCredential;

	shouldDecompressImages: boolean;

	addHandlersForProgressCompleted(progressBlock: (p1: number, p2: number, p3: NSURL) => void, completedBlock: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void): any;

	initWithRequestInSessionOptions?(request: NSURLRequest, session: NSURLSession, options: SDWebImageDownloaderOptions): SDWebImageDownloaderOperationInterface;

	setCredential(value: NSURLCredential): void;

	setShouldDecompressImages(value: boolean): void;
}
declare var SDWebImageDownloaderOperationInterface: {

	prototype: SDWebImageDownloaderOperationInterface;
};

declare const enum SDWebImageDownloaderOptions {

	LowPriority = 1,

	ProgressiveDownload = 2,

	UseNSURLCache = 4,

	IgnoreCachedResponse = 8,

	ContinueInBackground = 16,

	HandleCookies = 32,

	AllowInvalidSSLCertificates = 64,

	HighPriority = 128,

	ScaleDownLargeImages = 256
}

declare var SDWebImageErrorDomain: string;

declare class SDWebImageFrame extends NSObject {

	static alloc(): SDWebImageFrame; // inherited from NSObject

	static frameWithImageDuration(image: UIImage, duration: number): SDWebImageFrame;

	static new(): SDWebImageFrame; // inherited from NSObject

	readonly duration: number;

	readonly image: UIImage;
}

declare class SDWebImageGIFCoder extends NSObject implements SDWebImageCoder {

	static alloc(): SDWebImageGIFCoder; // inherited from NSObject

	static new(): SDWebImageGIFCoder; // inherited from NSObject

	static sharedCoder(): SDWebImageGIFCoder;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	canDecodeFromData(data: NSData): boolean;

	canEncodeToFormat(format: SDImageFormat): boolean;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	decodedImageWithData(data: NSData): UIImage;

	decompressedImageWithImageDataOptions(image: UIImage, data: interop.Pointer | interop.Reference<NSData>, optionsDict: NSDictionary<string, NSObject>): UIImage;

	encodedDataWithImageFormat(image: UIImage, format: SDImageFormat): NSData;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class SDWebImageImageIOCoder extends NSObject implements SDWebImageProgressiveCoder {

	static alloc(): SDWebImageImageIOCoder; // inherited from NSObject

	static new(): SDWebImageImageIOCoder; // inherited from NSObject

	static sharedCoder(): SDWebImageImageIOCoder;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	canDecodeFromData(data: NSData): boolean;

	canEncodeToFormat(format: SDImageFormat): boolean;

	canIncrementallyDecodeFromData(data: NSData): boolean;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	decodedImageWithData(data: NSData): UIImage;

	decompressedImageWithImageDataOptions(image: UIImage, data: interop.Pointer | interop.Reference<NSData>, optionsDict: NSDictionary<string, NSObject>): UIImage;

	encodedDataWithImageFormat(image: UIImage, format: SDImageFormat): NSData;

	incrementallyDecodedImageWithDataFinished(data: NSData, finished: boolean): UIImage;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare var SDWebImageInternalSetImageInGlobalQueueKey: string;

declare class SDWebImageManager extends NSObject {

	static alloc(): SDWebImageManager; // inherited from NSObject

	static new(): SDWebImageManager; // inherited from NSObject

	static sharedManager(): SDWebImageManager;

	cacheKeyFilter: (p1: NSURL) => string;

	delegate: SDWebImageManagerDelegate;

	readonly imageCache: SDImageCache;

	readonly imageDownloader: SDWebImageDownloader;

	constructor(o: { cache: SDImageCache; downloader: SDWebImageDownloader; });

	cacheKeyForURL(url: NSURL): string;

	cachedImageExistsForURLCompletion(url: NSURL, completionBlock: (p1: boolean) => void): void;

	cancelAll(): void;

	diskImageExistsForURLCompletion(url: NSURL, completionBlock: (p1: boolean) => void): void;

	initWithCacheDownloader(cache: SDImageCache, downloader: SDWebImageDownloader): this;

	isRunning(): boolean;

	loadImageWithURLOptionsProgressCompleted(url: NSURL, options: SDWebImageOptions, progressBlock: (p1: number, p2: number, p3: NSURL) => void, completedBlock: (p1: UIImage, p2: NSData, p3: NSError, p4: SDImageCacheType, p5: boolean, p6: NSURL) => void): SDWebImageOperation;

	saveImageToCacheForURL(image: UIImage, url: NSURL): void;
}

interface SDWebImageManagerDelegate extends NSObjectProtocol {

	imageManagerShouldDownloadImageForURL?(imageManager: SDWebImageManager, imageURL: NSURL): boolean;

	imageManagerTransformDownloadedImageWithURL?(imageManager: SDWebImageManager, image: UIImage, imageURL: NSURL): UIImage;
}
declare var SDWebImageManagerDelegate: {

	prototype: SDWebImageManagerDelegate;
};

interface SDWebImageOperation extends NSObjectProtocol {

	cancel(): void;
}
declare var SDWebImageOperation: {

	prototype: SDWebImageOperation;
};

declare const enum SDWebImageOptions {

	RetryFailed = 1,

	LowPriority = 2,

	CacheMemoryOnly = 4,

	ProgressiveDownload = 8,

	RefreshCached = 16,

	ContinueInBackground = 32,

	HandleCookies = 64,

	AllowInvalidSSLCertificates = 128,

	HighPriority = 256,

	DelayPlaceholder = 512,

	TransformAnimatedImage = 1024,

	AvoidAutoSetImage = 2048,

	ScaleDownLargeImages = 4096
}

declare class SDWebImagePrefetcher extends NSObject {

	static alloc(): SDWebImagePrefetcher; // inherited from NSObject

	static new(): SDWebImagePrefetcher; // inherited from NSObject

	static sharedImagePrefetcher(): SDWebImagePrefetcher;

	delegate: SDWebImagePrefetcherDelegate;

	readonly manager: SDWebImageManager;

	maxConcurrentDownloads: number;

	options: SDWebImageOptions;

	prefetcherQueue: NSObject;

	constructor(o: { imageManager: SDWebImageManager; });

	cancelPrefetching(): void;

	initWithImageManager(manager: SDWebImageManager): this;

	prefetchURLs(urls: NSArray<NSURL>): void;

	prefetchURLsProgressCompleted(urls: NSArray<NSURL>, progressBlock: (p1: number, p2: number) => void, completionBlock: (p1: number, p2: number) => void): void;
}

interface SDWebImagePrefetcherDelegate extends NSObjectProtocol {

	imagePrefetcherDidFinishWithTotalCountSkippedCount?(imagePrefetcher: SDWebImagePrefetcher, totalCount: number, skippedCount: number): void;

	imagePrefetcherDidPrefetchURLFinishedCountTotalCount?(imagePrefetcher: SDWebImagePrefetcher, imageURL: NSURL, finishedCount: number, totalCount: number): void;
}
declare var SDWebImagePrefetcherDelegate: {

	prototype: SDWebImagePrefetcherDelegate;
};

interface SDWebImageProgressiveCoder extends SDWebImageCoder {

	canIncrementallyDecodeFromData(data: NSData): boolean;

	incrementallyDecodedImageWithDataFinished(data: NSData, finished: boolean): UIImage;
}
declare var SDWebImageProgressiveCoder: {

	prototype: SDWebImageProgressiveCoder;
};

declare var SDWebImageVersionNumber: number;

declare var SDWebImageVersionString: interop.Reference<number>;
