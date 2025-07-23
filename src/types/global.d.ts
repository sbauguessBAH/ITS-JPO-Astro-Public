// Necessary because Bootstrap's API is exposed as global object 'bootstrap' on Window when using the CDN, which TS doesn't know about
declare const bootstrap: any;