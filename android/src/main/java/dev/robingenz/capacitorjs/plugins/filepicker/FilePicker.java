package dev.robingenz.capacitorjs.plugins.filepicker;

import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import com.getcapacitor.Bridge;

import java.io.File;

public class FilePicker {

    private Bridge bridge;

    FilePicker(Bridge bridge) {
        this.bridge = bridge;
    }

    public String getPathFromUri(Uri uri) {
        if (uri == null) {
            return "";
        }

        String filePath = uri.toString();
        return filePath;
    }

    public String getDisplayNameFromUri(Uri uri) {
        if (uri == null) {
            return "";
        }

        String fileName = "";
        String[] projection = { OpenableColumns.DISPLAY_NAME };
        Cursor cursor = bridge.getActivity().getContentResolver().query(uri, projection, null, null, null);
        if (cursor != null) {
            cursor.moveToFirst();
            int columnIdx = cursor.getColumnIndex(projection[0]);
            fileName = cursor.getString(columnIdx);
            cursor.close();
        }
        return fileName;
    }
}
