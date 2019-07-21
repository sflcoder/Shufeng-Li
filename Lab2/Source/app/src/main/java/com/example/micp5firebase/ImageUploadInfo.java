package com.example.micp5firebase;

public class ImageUploadInfo {

    public String imageName;

    public String imageURL;

    public ImageUploadInfo() {

    }

    public ImageUploadInfo( String url) {

       // this.imageName = name;
        this.imageURL= url;
    }

    public String getImageName() {
        return imageName;
    }

    public String getImageURL() {
        return imageURL;
    }

}