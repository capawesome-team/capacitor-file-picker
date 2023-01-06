import Foundation
import Capacitor
import UIKit
import MobileCoreServices

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FilePickerPlugin)
public class FilePickerPlugin: CAPPlugin {
    public let errorPickFileCanceled = "pickFiles canceled."
    public let errorUnknown = "Unknown error occurred."
    public let errorUnsupportedFileTypeIdentifier = "Unsupported file type identifier."
    private var implementation: FilePicker?
    private var savedCall: CAPPluginCall?

    override public func load() {
        self.implementation = FilePicker(self)
    }

    @objc func pickFiles(_ call: CAPPluginCall) {
        savedCall = call

        let multiple = call.getBool("multiple", false)
        let types = call.getArray("types", String.self) ?? []
        let parsedTypes = parseTypesOption(types)
        let documentTypes = parsedTypes.isEmpty ? ["public.data"] : parsedTypes

        implementation?.openDocumentPicker(multiple: multiple, documentTypes: documentTypes)
    }

    @objc func pickImages(_ call: CAPPluginCall) {
        savedCall = call

        let multiple = call.getBool("multiple", false)

        implementation?.openImagePicker(multiple: multiple)
    }

    @objc func pickMedia(_ call: CAPPluginCall) {
        savedCall = call

        let multiple = call.getBool("multiple", false)

        implementation?.openMediaPicker(multiple: multiple)
    }

    @objc func pickVideos(_ call: CAPPluginCall) {
        savedCall = call

        let multiple = call.getBool("multiple", false)

        implementation?.openVideoPicker(multiple: multiple)
    }

    @objc func parseTypesOption(_ types: [String]) -> [String] {
        var parsedTypes: [String] = []
        for (_, type) in types.enumerated() {
            guard let utType: String = UTTypeCreatePreferredIdentifierForTag(kUTTagClassMIMEType, type as CFString, nil)?.takeRetainedValue() as String? else {
                continue
            }
            parsedTypes.append(utType)
        }
        return parsedTypes
    }

    @objc func handleDocumentPickerResult(urls: [URL]?, error: String?) {
        guard let savedCall = savedCall else {
            return
        }
        if let error = error {
            savedCall.reject(error)
            return
        }
        let readData = savedCall.getBool("readData", false)
        guard let urls = urls else {
            savedCall.reject(errorPickFileCanceled)
            return
        }
        do {
            var result = JSObject()
            let filesResult = try urls.map {(url: URL) -> JSObject in
                var file = JSObject()
                file["path"] = implementation?.getPathFromUrl(url) ?? ""
                file["name"] = implementation?.getNameFromUrl(url) ?? ""
                if readData == true {
                    file["data"] = try implementation?.getDataFromUrl(url) ?? ""
                }
                file["mimeType"] = implementation?.getMimeTypeFromUrl(url) ?? ""
                file["size"] = try implementation?.getSizeFromUrl(url) ?? -1
                let duration = implementation?.getDurationFromUrl(url)
                if let duration = duration {
                    file["duration"] = duration
                }
                let (height, width) = implementation?.getHeightAndWidthFromUrl(url) ?? (nil, nil)
                if let height = height {
                    file["height"] = height
                }
                if let width = width {
                    file["width"] = width
                }
                return file
            }
            result["files"] = filesResult
            savedCall.resolve(result)
        } catch let error as NSError {
            savedCall.reject(error.localizedDescription, nil, error)
            return
        }
    }
}
