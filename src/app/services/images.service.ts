import { Injectable } from '@angular/core';
import { ImageCompressService } from 'ng2-image-compress';

interface Ibase64Image {
    imageDataUrl: string;
    fileName: string;
    type: string;
};

@Injectable({
    providedIn: 'root'
})
export class ImagesService {

    constructor() { }

    // Mejorar esta funcion de forma que funcione con un return true o return false
    imageExists = (url) => {
        var img = new Image();
        img.src = url;

        var promise: Promise<boolean> = new Promise(
            (resolve, reject) => {
                img.onload = () => { resolve(true) };
                img.onerror = () => { resolve(false) };
            }
        )
        return promise
    }

    compressImage(fileList: FileList, returnType?: { returnBlob?: boolean, returnbase64?: boolean }): Promise<Array<any>> {
        const files: File[] = Array.from(fileList);
        let compressedFiles: Array<any> = [];

        var promise: Promise<Array<File>> = new Promise(
            (resolve, reject) => {
                ImageCompressService.filesToCompressedImageSource(fileList)
                    .then(
                        observableImages => {
                            observableImages.subscribe(
                                (image) => {
                                    const compressedImage = this.base64ToFile(image.compressedImage, returnType)
                                    compressedFiles.push(compressedImage);
                                },
                                (error) => { reject("Error while converting"); },
                                () => { resolve(compressedFiles) }
                            );
                        });
            });

        return promise
    }

    base64ToFile<File>(base64Img: Ibase64Image, returnType?: { returnBlob?: boolean, returnbase64?: boolean }) {
        let base64String: string = base64Img.imageDataUrl;
        const fileName: string = base64Img.fileName;
        const type: string = base64Img.type;
        if (returnType && returnType['returnbase64']) return base64String

        base64String = base64String.substring(23);
        const byteString = window.atob(base64String);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) int8Array[i] = byteString.charCodeAt(i);
        const blob = new Blob([int8Array], { type: type });

        if (returnType && returnType['returnBlob']) return blob
        const file = new File([blob], fileName, { type: type });
        return file
    }

}
