import { Injectable } from '@angular/core';
import * as CryptoJSA from 'crypto-js';
@Injectable({
    providedIn: 'root'
})
export class AESCryptoService {
    dfPe = 'IWVybUBsYWN2aWV0LnZuIQ==';
    constructor() { }
    // The set method is use for encrypt the value.
    encrypt(value: string, password?: string) {
        if (password == null) {
            password = this.decode(this.dfPe);
        }
        const key = CryptoJSA.enc.Utf8.parse(password);
        const iv = CryptoJSA.enc.Utf8.parse(password);
        const encrypted = CryptoJSA.AES.encrypt(CryptoJSA.enc.Utf8.parse(value.toString()), key,
            {
                keySize: 128 / 8,
                iv,
                mode: CryptoJSA.mode.CBC,
                padding: CryptoJSA.pad.Pkcs7
            });
        return encrypted.toString();
    }

    // The get method is use for decrypt the value.
    decrypt(value: string, password?: string) {
        if (password == null) {
            password = this.decode(this.dfPe);
        }
        const key = CryptoJSA.enc.Utf8.parse(password);
        const iv = CryptoJSA.enc.Utf8.parse(password);
        const decrypted = CryptoJSA.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv,
            mode: CryptoJSA.mode.CBC,
            padding: CryptoJSA.pad.Pkcs7
        });
        return decrypted.toString(CryptoJSA.enc.Utf8);
    }

    encode(text: string) {
        // PROCESS
        const encodedWord = CryptoJSA.enc.Utf8.parse(text);
        const encoded = CryptoJSA.enc.Base64.stringify(encodedWord);
        return encoded;
    }

    decode(encoded: string) {
        const encodedWord = CryptoJSA.enc.Base64.parse(encoded);
        return CryptoJSA.enc.Utf8.stringify(encodedWord);
    }

    arrayBufferToBase64(buffer: any[]) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    $basicEncStr(str:string) {
        return encodeURIComponent(btoa(btoa(encodeURIComponent(str)).split("").reverse().join("")).split("").reverse().join(""));
    }
}
