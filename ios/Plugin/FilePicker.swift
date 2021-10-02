import Foundation
import Capacitor
import UIKit
import MobileCoreServices

@objc public class FilePicker: NSObject {
    private var plugin: FilePickerPlugin?

    init(_ plugin: FilePickerPlugin?) {
        super.init()
        self.plugin = plugin
    }

    public func openDocumentPicker(multiple: Bool, documentTypes: [String]) {
        DispatchQueue.main.async {
            let documentPicker = UIDocumentPickerViewController(documentTypes: documentTypes, in: .import)
            documentPicker.delegate = self
            documentPicker.allowsMultipleSelection = multiple
            documentPicker.modalPresentationStyle = .fullScreen
            self.plugin?.bridge?.viewController?.present(documentPicker, animated: true, completion: nil)
        }
    }

    public func getPathFromUrl(_ url: URL) -> String {
        return url.absoluteString
    }

    public func getNameFromUrl(_ url: URL) -> String {
        return url.lastPathComponent
    }

    public func getDataFromUrl(_ url: URL) throws -> String {
        let data = try Data(contentsOf: url)
        return data.base64EncodedString()
    }

    public func getMimeTypeFromUrl(_ url: URL) -> String {
        let fileExtension = url.pathExtension as CFString
        guard let extUTI = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, fileExtension, nil)?.takeUnretainedValue() else {
            return ""
        }
        guard let mimeUTI = UTTypeCopyPreferredTagWithClass(extUTI, kUTTagClassMIMEType) else {
            return ""
        }
        return mimeUTI.takeRetainedValue() as String
    }

    public func getSizeFromUrl(_ url: URL) throws -> Int {
        let values = try url.resourceValues(forKeys: [.fileSizeKey])
        return values.fileSize ?? 0
    }
}

extension FilePicker: UIDocumentPickerDelegate {
    public func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        plugin?.handleDocumentPickerResult(urls: urls)
    }

    public func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
        plugin?.handleDocumentPickerResult(urls: nil)
    }
}
