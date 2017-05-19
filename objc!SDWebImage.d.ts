
declare class SDImageCache extends NSObject {

	static alloc(): SDImageCache; // inherited from NSObject

	static new(): SDImageCache; // inherited from NSObject

	static sharedImageCache(): SDImageCache;

	maxCacheAge: number;

	maxCacheSize: number;

	maxMemoryCost: number;

	maxMemoryCountLimit: number;

	shouldCacheImagesInMemory: boolean;

	shouldDecompressImages: boolean;

	shouldDisableiCloud: boolean;

	constructor(o: { namespace: string; });

	constructor(o: { namespace: string; diskCacheDirectory: string; });

	addReadOnlyCachePath(path: string): void;

	cachePathForKeyInPath(key: string, path: string): string;

	calculateSizeWithCompletionBlock(completionBlock: (p1: number, p2: number) => void): void;

	cleanDisk(): void;

	cleanDiskWithCompletionBlock(completionBlock: () => void): void;

	clearDisk(): void;

	clearDiskOnCompletion(completion: () => void): void;

	clearMemory(): void;

	defaultCachePathForKey(key: string): string;

	diskImageExistsWithKey(key: string): boolean;

	diskImageExistsWithKeyCompletion(key: string, completionBlock: (p1: boolean) => void): void;

	getDiskCount(): number;

	getSize(): number;

	imageFromDiskCacheForKey(key: string): UIImage;

	imageFromMemoryCacheForKey(key: string): UIImage;

	initWithNamespace(ns: string): this;

	initWithNamespaceDiskCacheDirectory(ns: string, directory: string): this;

	makeDiskCachePath(fullNamespace: string): string;

	queryDiskCacheForKeyDone(key: string, doneBlock: (p1: UIImage, p2: SDImageCacheType) => void): NSOperation;

	removeImageForKey(key: string): void;

	removeImageForKeyFromDisk(key: string, fromDisk: boolean): void;

	removeImageForKeyFromDiskWithCompletion(key: string, fromDisk: boolean, completion: () => void): void;

	removeImageForKeyWithCompletion(key: string, completion: () => void): void;

	storeImageDataToDiskForKey(imageData: NSData, key: string): void;

	storeImageForKey(image: UIImage, key: string): void;

	storeImageForKeyToDisk(image: UIImage, key: string, toDisk: boolean): void;

	storeImageRecalculateFromImageImageDataForKeyToDisk(image: UIImage, recalculate: boolean, imageData: NSData, key: string, toDisk: boolean): void;
}

declare const enum SDImageCacheType {

	None = 0,

	Disk = 1,

	Memory = 2
}

declare function SDScaledImageForKey(key: string, image: UIImage): UIImage;

declare var SDWebImageDownloadFinishNotification: string;

declare var SDWebImageDownloadReceiveResponseNotification: string;

declare var SDWebImageDownloadStartNotification: string;

declare var SDWebImageDownloadStartNotificationVar: string;

declare var SDWebImageDownloadStopNotification: string;

declare var SDWebImageDownloadStopNotificationVar: string;

declare class SDWebImageDownloader extends NSObject {

	static alloc(): SDWebImageDownloader; // inherited from NSObject

	static new(): SDWebImageDownloader; // inherited from NSObject

	static sharedDownloader(): SDWebImageDownloader;

	readonly currentDownloadCount: number;

	downloadTimeout: number;

	executionOrder: SDWebImageDownloaderExecutionOrder;

	headersFilter: (p1: NSURL, p2: NSDictionary<any, any>) => NSDictionary<any, any>;

	maxConcurrentDownloads: number;

	password: string;

	shouldDecompressImages: boolean;

	urlCredential: NSURLCredential;

	username: string;

	cancelAllDownloads(): void;

	downloadImageWithURLOptionsProgressCompleted(url: NSURL, options: SDWebImageDownloaderOptions, progressBlock: (p1: number, p2: number) => void, completedBlock: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void): SDWebImageOperation;

	setOperationClass(operationClass: typeof NSObject): void;

	setSuspended(suspended: boolean): void;

	setValueForHTTPHeaderField(value: string, field: string): void;

	valueForHTTPHeaderField(field: string): string;
}

declare const enum SDWebImageDownloaderExecutionOrder {

	FIFOExecutionOrder = 0,

	LIFOExecutionOrder = 1
}

declare class SDWebImageDownloaderOperation extends NSOperation implements NSURLSessionDataDelegate, NSURLSessionTaskDelegate, SDWebImageOperation {

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

	constructor(o: { request: NSURLRequest; inSession: NSURLSession; options: SDWebImageDownloaderOptions; progress: (p1: number, p2: number) => void; completed: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void; cancelled: () => void; });

	constructor(o: { request: NSURLRequest; options: SDWebImageDownloaderOptions; progress: (p1: number, p2: number) => void; completed: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void; cancelled: () => void; });

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

	URLSessionTaskNeedNewBodyStream(session: NSURLSession, task: NSURLSessionTask, completionHandler: (p1: NSInputStream) => void): void;

	URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler(session: NSURLSession, task: NSURLSessionTask, response: NSHTTPURLResponse, request: NSURLRequest, completionHandler: (p1: NSURLRequest) => void): void;

	cancel(): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	initWithRequestInSessionOptionsProgressCompletedCancelled(request: NSURLRequest, session: NSURLSession, options: SDWebImageDownloaderOptions, progressBlock: (p1: number, p2: number) => void, completedBlock: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void, cancelBlock: () => void): this;

	initWithRequestOptionsProgressCompletedCancelled(request: NSURLRequest, options: SDWebImageDownloaderOptions, progressBlock: (p1: number, p2: number) => void, completedBlock: (p1: UIImage, p2: NSData, p3: NSError, p4: boolean) => void, cancelBlock: () => void): this;

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

declare const enum SDWebImageDownloaderOptions {

	LowPriority = 1,

	ProgressiveDownload = 2,

	UseNSURLCache = 4,

	IgnoreCachedResponse = 8,

	ContinueInBackground = 16,

	HandleCookies = 32,

	AllowInvalidSSLCertificates = 64,

	HighPriority = 128
}

declare var SDWebImageErrorDomain: string;

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

	cachedImageExistsForURL(url: NSURL): boolean;

	cachedImageExistsForURLCompletion(url: NSURL, completionBlock: (p1: boolean) => void): void;

	cancelAll(): void;

	diskImageExistsForURL(url: NSURL): boolean;

	diskImageExistsForURLCompletion(url: NSURL, completionBlock: (p1: boolean) => void): void;

	downloadImageWithURLOptionsProgressCompleted(url: NSURL, options: SDWebImageOptions, progressBlock: (p1: number, p2: number) => void, completedBlock: (p1: UIImage, p2: NSError, p3: SDImageCacheType, p4: boolean, p5: NSURL) => void): SDWebImageOperation;

	downloadWithURLOptionsProgressCompleted(url: NSURL, options: SDWebImageOptions, progressBlock: (p1: number, p2: number) => void, completedBlock: (p1: UIImage, p2: NSError, p3: SDImageCacheType, p4: boolean) => void): SDWebImageOperation;

	initWithCacheDownloader(cache: SDImageCache, downloader: SDWebImageDownloader): this;

	isRunning(): boolean;

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

	AvoidAutoSetImage = 2048
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

	prefetchURLs(urls: NSArray<any>): void;

	prefetchURLsProgressCompleted(urls: NSArray<any>, progressBlock: (p1: number, p2: number) => void, completionBlock: (p1: number, p2: number) => void): void;
}

interface SDWebImagePrefetcherDelegate extends NSObjectProtocol {

	imagePrefetcherDidFinishWithTotalCountSkippedCount?(imagePrefetcher: SDWebImagePrefetcher, totalCount: number, skippedCount: number): void;

	imagePrefetcherDidPrefetchURLFinishedCountTotalCount?(imagePrefetcher: SDWebImagePrefetcher, imageURL: NSURL, finishedCount: number, totalCount: number): void;
}
declare var SDWebImagePrefetcherDelegate: {

	prototype: SDWebImagePrefetcherDelegate;
};

declare var SDWebImageVersionNumber: number;

declare var SDWebImageVersionString: interop.Reference<number>;
