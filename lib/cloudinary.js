import {v2 as cloudinary} from 'cloudinary';

export function upload(image) { //returns a url
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}

export function fetch(asset_id) { //returns a object
    return new Promise((resolve, reject) => {
        cloudinary.api
            .resource_by_asset_id(asset_id)
            .then(resolve);
    });
}