package com.example.micp5firebase;

import android.net.Uri;

/**
 * Created by Rashmi on 4/16/2018.
 */

public class User {

        public String name;
        public String phone;
        public Uri imagePath;

        // Default constructor required for calls to
        // DataSnapshot.getValue(User.class)
        public User() {
        }

        public User(String name, String phone, Uri imagePath) {
            this.name = name;
            this.phone = phone;
            this.imagePath = imagePath;
        }

        public String getName(){
            return name;
        }

    public String getPhone(){
        return phone;
    }
    public Uri getImagePath() {
        return imagePath;
    }
}

