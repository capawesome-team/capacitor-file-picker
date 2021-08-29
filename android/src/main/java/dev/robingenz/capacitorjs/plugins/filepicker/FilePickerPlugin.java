package dev.robingenz.capacitorjs.plugins.filepicker;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import androidx.annotation.Nullable;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.List;
import org.json.JSONException;

@CapacitorPlugin(name = "FilePicker")
public class FilePickerPlugin extends Plugin {

    public static final String ERROR_PICK_FILE_FAILED = "pickFile failed.";
    public static final String ERROR_PICK_FILE_CANCELED = "pickFile canceled.";
    private FilePicker implementation;

    public void load() {
        implementation = new FilePicker(this.getBridge());
    }

    @PluginMethod
    public void pickFile(PluginCall call) {
        JSArray types = call.getArray("types");
        String[] parsedTypes = parseTypesOption(types);

        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        if (parsedTypes != null) {
            intent.putExtra(Intent.EXTRA_MIME_TYPES, parsedTypes);
        }

        intent = Intent.createChooser(intent, "Choose a file");

        startActivityForResult(call, intent, "pickFileResult");
    }

    @Nullable
    private String[] parseTypesOption(@Nullable JSArray types) {
        if (types == null) {
            return null;
        }
        try {
            List<String> typesList = types.toList();
            return typesList.toArray(new String[0]);
        } catch (JSONException exception) {
            Logger.error("parseTypesOption failed.", exception);
            return null;
        }
    }

    @ActivityCallback
    private void pickFileResult(PluginCall call, ActivityResult result) {
        if (call == null) {
            return;
        }
        int resultCode = result.getResultCode();
        Intent data = result.getData();
        switch (resultCode) {
            case Activity.RESULT_OK:
                Uri uri = data.getData();
                JSObject callResult = new JSObject();
                callResult.put("path", implementation.getPathFromUri(uri));
                callResult.put("name", implementation.getNameFromUri(uri));
                callResult.put("data", implementation.getDataFromUri(uri));
                callResult.put("mimeType", implementation.getMimeTypeFromUri(uri));
                callResult.put("size", implementation.getSizeFromUri(uri));
                call.resolve(callResult);
                break;
            case Activity.RESULT_CANCELED:
                call.reject(ERROR_PICK_FILE_CANCELED);
                break;
            default:
                call.reject(ERROR_PICK_FILE_FAILED);
        }
    }
}
