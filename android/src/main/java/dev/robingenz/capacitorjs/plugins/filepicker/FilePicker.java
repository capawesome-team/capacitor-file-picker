package dev.robingenz.capacitorjs.plugins.filepicker;

import android.database.Cursor;
import android.net.Uri;
import android.provider.OpenableColumns;

import com.getcapacitor.Bridge;

public class FilePicker {
    private Bridge bridge;

    FilePicker(Bridge bridge) {
        this.bridge = bridge;
    }

    public String getPathFromUri(Uri uri) {
        if (uri == null) {
            return "";
        }

        String path = null;
        Cursor cursor = bridge.getActivity().getContentResolver().query(uri, null, null, null, null);
        if(cursor != null){
            cursor.moveToFirst();
            int columnIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
            path = cursor.getString(columnIndex);
            cursor.close();
        }
        if (path == null || path.isEmpty()) {
            path = uri.getPath();
        }

        return path;
    }
}
