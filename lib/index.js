"use strict";
exports.__esModule = true;
function crop(imageElement, options, callback) {
    var cropWidth = options.width, cropHeight = options.height;
    var imageWidth = imageElement.width, imageHeight = imageElement.height;
    var faceObjects = new tracking.ObjectTracker(['face']);
    // 设置识别时候的缩放比例，设置越高越能提高效率，但是可能会降低准确率
    faceObjects.setInitialScale(Math.min(imageWidth, imageHeight) / 150);
    faceObjects.on('track', function (event) {
        if (event.data.length === 0) {
            callback({
                x: (imageWidth - cropWidth) / 2,
                y: (imageHeight - cropHeight) / 2,
                width: cropWidth,
                height: cropHeight,
                faces: []
            });
            return;
        }
        var _a = event.data[0], faceX = _a.x, faceY = _a.y, faceWidth = _a.width, faceHeight = _a.height;
        var result = {
            x: faceX + faceWidth / 2 - cropWidth / 2,
            y: faceY + faceHeight / 2 - cropHeight / 2,
            width: cropWidth,
            height: cropHeight,
            faces: event.data
        };
        if (result.x < 0) {
            result.x = 0;
        }
        if (result.y < 0) {
            result.y = 0;
        }
        if (result.x + result.width > imageWidth) {
            result.x = imageWidth - cropWidth;
        }
        if (result.y + result.height > imageHeight) {
            result.y = imageHeight - cropHeight;
        }
        callback(result);
    });
    tracking.track(imageElement, faceObjects);
}
exports["default"] = crop;
