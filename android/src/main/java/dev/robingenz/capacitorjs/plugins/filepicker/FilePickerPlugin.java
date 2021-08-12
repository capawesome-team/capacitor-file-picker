package dev.robingenz.capacitorjs.plugins.filepicker;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

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
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.putExtra(Intent.EXTRA_LOCAL_ONLY, true);

        intent = Intent.createChooser(intent, "Choose a file");

        startActivityForResult(call, intent, "pickFileResult");
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
                callResult.put("name", implementation.getDisplayNameFromUri(uri));
                callResult.put("data", implementation.getBase64DataFromUri(uri));
                callResult.put("mimeType", implementation.getMimeTypeFromUri(uri));
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
