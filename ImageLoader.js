
class ImageLoader {
    constructor() {
        this.lstPaths = [];
        this.lstImages = [];
        this.callBack = null;
        this.loadedImageCount = 0;
    }

    add(pPathImage) {
        this.lstPaths.push(pPathImage);
    }

    // LONGUEUR DE LA LISTE
    getTotalImages() {
        return this.lstPaths.length;
    }
    // TOTAL D'IMAGES CHARGEES
    getTotalImagesLoaded() {
        return this.loadedImageCount;
    }

    getLoadedRatio() {
        return this.loadedImageCount / this.getTotalImages();
    }

    getListImages() {
        return this.lstImages;
    }
    //  DEMARRER LE JEU
    start(pCallBack) {
        this.callBack = pCallBack;
        this.lstPaths.forEach(path => {
            let img = new Image();
            img.onload = this.imageLoaded.bind(this);
            img.src = path;
            this.lstImages[path] = img;
        });
    }

    imageLoaded(e) {
        this.loadedImageCount++;
        console.log("Image chargée : ", e.target.currentSrc);
        if (this.loadedImageCount == this.lstPaths.length) {
            this.callBack();
        }
    }

    getImage(pPath) {
        return this.lstImages[pPath];
    }
}