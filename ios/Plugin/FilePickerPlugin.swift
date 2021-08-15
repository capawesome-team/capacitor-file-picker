import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FilePickerPlugin)
public class FilePickerPlugin: CAPPlugin {
    public let errorPickFileCanceled = "pickFile canceled."
    private var implementation: FilePicker?
    private var savedCall: CAPPluginCall?

    override public func load() {
        self.implementation = FilePicker(self)
    }

    @objc func pickFile(_ call: CAPPluginCall) {
        savedCall = call
        implementation?.openDocumentPicker()
    }

    func handleDocumentPickerResult(url: URL?) {
        guard let savedCall = savedCall else {
            return
        }
        guard let url = url else {
            savedCall.reject(errorPickFileCanceled)
            return
        }
        do {
            savedCall.resolve([
                "path": implementation?.getPathFromUrl(url) ?? "",
                "name": implementation?.getNameFromUrl(url) ?? "",
                "data": try implementation?.getDataFromUrl(url) ?? "",
                "mimeType": implementation?.getMimeTypeFromUrl(url) ?? "",
                "size": try implementation?.getSizeFromUrl(url) ?? ""
            ])
        } catch let error as NSError {
            savedCall.reject(error.localizedDescription, nil, error)
            return
        }
    }
}
