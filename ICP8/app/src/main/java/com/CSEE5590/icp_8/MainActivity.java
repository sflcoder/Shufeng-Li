package com.CSEE5590.icp_8;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void checkCredentials(View view) {
        EditText usernameCtrl = (EditText)findViewById(R.id.txt_uname);
        EditText passwordCtrl = (EditText)findViewById(R.id.txt_Pwd);
        TextView errorText = (TextView)findViewById(R.id.Lab1_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

        Intent intent = new Intent();
        boolean validationFlag = false;
        if(!userName.isEmpty() && !password.isEmpty()){
            if(userName.equals("Admin") && password.equals("Admin")){
                validationFlag =true;
            }
        }

        if(!validationFlag)
        {
            errorText.setVisibility(View.VISIBLE);
            Log.i("MainActivity", "validationFlag is false");
        }
        else
        {
            Log.i("MainActivity", "validationFlag is true");
            intent.setClass(getApplicationContext(),SuccessActivity.class);
            startActivity(intent);
        }
    }
}
