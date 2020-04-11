# NativeScript Angular Application

> A native application build with Nativescript-Angular

## Usage

``` bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```


## Building

Before building this sample project, you must build the root plugin nativescript-image-cache-it.
Alternativelly for building the root project, you can apply the patch to build the sample independently:

```patch
diff --git a/demo-ng/package.json b/demo-ng/package.json
index a01d840..1d01716 100644
--- a/demo-ng/package.json
+++ b/demo-ng/package.json
@@ -22,11 +22,12 @@
     "@angular/platform-browser-dynamic": "~8.2.0",
     "@angular/router": "~8.2.0",
     "nativescript-angular": "^8.2.1",
-    "nativescript-image-cache-it": "file:../src",
+    "nativescript-image-cache-it": "latest",
     "nativescript-theme-core": "~1.0.4",
     "reflect-metadata": "~0.1.8",
     "rxjs": "^6.4.0",
     "tns-core-modules": "^6.1.1",
+    "tns-platform-declarations": "^6.5.1",
     "zone.js": "^0.9.1"
   },
   "devDependencies": {
diff --git a/demo-ng/references.d.ts b/demo-ng/references.d.ts
index 680f3ef..1e5e961 100644
--- a/demo-ng/references.d.ts
+++ b/demo-ng/references.d.ts
@@ -1,2 +1,2 @@
-/// <reference path="../src/node_modules/tns-platform-declarations/ios.d.ts" />
-/// <reference path="../src/node_modules/tns-platform-declarations/android.d.ts" />
+/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
+/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />
diff --git a/demo-ng/tsconfig.json b/demo-ng/tsconfig.json
index dbb7c94..daeecaf 100644
--- a/demo-ng/tsconfig.json
+++ b/demo-ng/tsconfig.json
@@ -23,7 +23,7 @@
         }
     },
     "include": [
-        "../src",
+        // "../src",
         "**/*"
     ],
     "exclude": [

```


This template creates a "Hello, world" NativeScript app using TypeScript and Angular.

You can create a new app that uses this template with either the `--template` option.

```
tns create my-app-name --template tns-template-hello-world-ng
```

Or the `--ng` shorthand.

```
tns create my-app-name --ng
```

> Note: Both commands will create a new NativeScript app that uses the latest version of this template published to [npm] (https://www.npmjs.com/package/tns-template-hello-world-ng).

If you want to create a new app that uses the source of the template from the `master` branch, you can execute the following:

```
tns create my-app-name --template https://github.com/NativeScript/template-hello-world-ng.git#master
```

**NB:** Please, have in mind that the master branch may refer to dependencies that are not on NPM yet!
