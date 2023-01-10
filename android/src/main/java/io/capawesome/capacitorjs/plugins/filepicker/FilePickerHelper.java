package io.capawesome.capacitorjs.plugins.filepicker;

import android.content.ContentResolver;
import android.database.Cursor;
import android.net.Uri;
import android.provider.DocumentsContract;
import android.util.Log;

import androidx.annotation.Nullable;

import com.getcapacitor.JSArray;
import com.getcapacitor.Logger;

import org.json.JSONException;

import java.util.LinkedList;
import java.util.List;

public class FilePickerHelper {

    @Nullable
    public static String[] parseTypesOption(@Nullable JSArray types) {
        if (types == null) {
            return null;
        }
        try {
            List<String> typesList = types.toList();
            if (typesList.contains("text/csv")) {
                typesList.add("text/comma-separated-values");
            }
            return typesList.toArray(new String[0]);
        } catch (JSONException exception) {
            Logger.error("parseTypesOption failed.", exception);
            return null;
        }
    }

    public static void traverseDirectoryEntries(ContentResolver contentResolver, Uri rootUri) {
        Uri childrenUri;
        try {
            //for childs and sub child dirs
            childrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(rootUri, DocumentsContract.getDocumentId(rootUri));
        } catch (Exception e) {
            // for parent dir
            childrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(rootUri, DocumentsContract.getTreeDocumentId(rootUri));
        }

        List<Uri> dirNodes = new LinkedList<>();
        dirNodes.add(childrenUri);

        while(!dirNodes.isEmpty()) {
            // Get the item from the top
            childrenUri = dirNodes.remove(0);
            Cursor c = contentResolver.query(childrenUri, new String[]{DocumentsContract.Document.COLUMN_DOCUMENT_ID, DocumentsContract.Document.COLUMN_DISPLAY_NAME, DocumentsContract.Document.COLUMN_MIME_TYPE}, null, null, null);
            while (c.moveToNext()) {
                final String docId = c.getString(0);
                final String name = c.getString(1);
                final String mime = c.getString(2);
                Log.d("sss", "childrenUri: " + childrenUri + ", docId: " + docId + ", name: " + name + ", mime: " + mime);
                //if(isDirectory(mime)) {
                //    final Uri newNode = DocumentsContract.buildChildDocumentsUriUsingTree(rootUri, docId);
                //    dirNodes.add(newNode);
                //}
            }
        }
    }
}
