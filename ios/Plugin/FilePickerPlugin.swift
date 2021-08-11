import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FilePickerPlugin)
public class FilePickerPlugin: CAPPlugin {
    private let implementation = FilePicker()

    @objc func pickFile(_ call: CAPPluginCall) {
        call.reject("Not implemented on iOS.")
    }
}
