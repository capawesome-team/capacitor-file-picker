import Foundation
import PhotosUI
import Photos
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

    public func openImagePicker(multiple: Bool) {
        DispatchQueue.main.async {
            if #available(iOS 14, *) {
                var configuration = PHPickerConfiguration(photoLibrary: PHPhotoLibrary.shared())
                configuration.selectionLimit = multiple ? 0 : 1
                configuration.filter = .images
                let picker = PHPickerViewController(configuration: configuration)
                picker.delegate = self
                picker.modalPresentationStyle = .fullScreen
                self.plugin?.bridge?.viewController?.present(picker, animated: true, completion: nil)
            } else {
                let picker = UIImagePickerController()
                picker.delegate = self
                picker.sourceType = .photoLibrary
                picker.modalPresentationStyle = .fullScreen
                self.plugin?.bridge?.viewController?.present(picker, animated: true, completion: nil)
            }
        }
    }

    public func openMediaPicker(multiple: Bool) {
        DispatchQueue.main.async {
            if #available(iOS 14, *) {
                var configuration = PHPickerConfiguration(photoLibrary: PHPhotoLibrary.shared())
                configuration.selectionLimit = multiple ? 0 : 1
                let picker = PHPickerViewController(configuration: configuration)
                picker.delegate = self
                picker.modalPresentationStyle = .fullScreen
                self.plugin?.bridge?.viewController?.present(picker, animated: true, completion: nil)
            } else {
                let picker = UIImagePickerController()
                picker.delegate = self
                picker.mediaTypes = ["public.movie", "public.image"]
                picker.modalPresentationStyle = .fullScreen
                self.plugin?.bridge?.viewController?.present(picker, animated: true, completion: nil)
            }
        }
    }

    public func openVideoPicker(multiple: Bool) {
        DispatchQueue.main.async {
            if #available(iOS 14, *) {
                var configuration = PHPickerConfiguration(photoLibrary: PHPhotoLibrary.shared())
                configuration.selectionLimit = multiple ? 0 : 1
                configuration.filter = .videos
                let picker = PHPickerViewController(configuration: configuration)
                picker.delegate = self
                picker.modalPresentationStyle = .fullScreen
                self.plugin?.bridge?.viewController?.present(picker, animated: true, completion: nil)
            } else {
                let picker = UIImagePickerController()
                picker.delegate = self
                picker.mediaTypes = ["public.movie"]
                picker.modalPresentationStyle = .fullScreen
                self.plugin?.bridge?.viewController?.present(picker, animated: true, completion: nil)
            }
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

    public func getDurationFromUrl(_ url: URL) -> Int? {
        if isVideoUrl(url) {
            let asset = AVAsset(url: url)
            let duration = asset.duration
            let durationTime = CMTimeGetSeconds(duration)
            return Int(durationTime) * 1000
        }
        return nil
    }

    public func getHeightAndWidthFromUrl(_ url: URL) -> (Int?, Int?) {
        if isImageUrl(url) {
            if let imageSource = CGImageSourceCreateWithURL(url as CFURL, nil) {
                if let imageProperties = CGImageSourceCopyPropertiesAtIndex(imageSource, 0, nil) as Dictionary? {
                    let width = imageProperties[kCGImagePropertyPixelWidth] as? Int
                    let height = imageProperties[kCGImagePropertyPixelHeight] as? Int
                    return (height, width)
                }
            }
        } else if isVideoUrl(url) {
            guard let track = AVURLAsset(url: url).tracks(withMediaType: AVMediaType.video).first else { return (nil, nil) }
            let size = track.naturalSize.applying(track.preferredTransform)
            let height = abs(Int(size.height))
            let width = abs(Int(size.width))
            return (height, width)
        }
        return (nil, nil)
    }

    private func isImageUrl(_ url: URL) -> Bool {
        let mimeType = self.getMimeTypeFromUrl(url)
        return mimeType.hasPrefix("image")
    }

    private func isVideoUrl(_ url: URL) -> Bool {
        let mimeType = self.getMimeTypeFromUrl(url)
        return mimeType.hasPrefix("video")
    }

    private func saveTemporaryFile(_ sourceUrl: URL) throws -> URL {
        let timestamp = NSDate().timeIntervalSince1970
        let targetUrl = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("\(timestamp)_\(sourceUrl.lastPathComponent)")
        try FileManager.default.copyItem(at: sourceUrl, to: targetUrl)
        return targetUrl
    }
}

extension FilePicker: UIDocumentPickerDelegate {
    public func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        do {
            let temporaryUrls = try urls.map { try saveTemporaryFile($0) }
            plugin?.handleDocumentPickerResult(urls: temporaryUrls, error: nil)
        } catch {
            plugin?.handleDocumentPickerResult(urls: nil, error: self.plugin?.errorTemporaryCopyFailed)
        }
    }

    public func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
        plugin?.handleDocumentPickerResult(urls: nil, error: nil)
    }
}

extension FilePicker: UIImagePickerControllerDelegate, UINavigationControllerDelegate, UIPopoverPresentationControllerDelegate {
    public func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true)
        plugin?.handleDocumentPickerResult(urls: nil, error: nil)
    }

    public func popoverPresentationControllerDidDismissPopover(_ popoverPresentationController: UIPopoverPresentationController) {
        plugin?.handleDocumentPickerResult(urls: nil, error: nil)
    }

    public func presentationControllerDidDismiss(_ presentationController: UIPresentationController) {
        plugin?.handleDocumentPickerResult(urls: nil, error: nil)
    }

    public func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
        picker.dismiss(animated: true) {
            if let url = info[.mediaURL] as? URL {
                do {
                    let temporaryUrl = try self.saveTemporaryFile(url)
                    self.plugin?.handleDocumentPickerResult(urls: [temporaryUrl], error: nil)
                } catch {
                    self.plugin?.handleDocumentPickerResult(urls: nil, error: self.plugin?.errorTemporaryCopyFailed)
                }
            } else {
                self.plugin?.handleDocumentPickerResult(urls: nil, error: nil)
            }
        }
    }
}

@available(iOS 14, *)
extension FilePicker: PHPickerViewControllerDelegate {
    public func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
        picker.dismiss(animated: true, completion: nil)
        guard let result = results.first else {
            self.plugin?.handleDocumentPickerResult(urls: nil, error: nil)
            return
        }
        if result.itemProvider.hasItemConformingToTypeIdentifier(UTType.movie.identifier) {
            result.itemProvider.loadFileRepresentation(forTypeIdentifier: UTType.movie.identifier, completionHandler: { url, error in
                if let error = error {
                    self.plugin?.handleDocumentPickerResult(urls: nil, error: error.localizedDescription)
                    return
                }
                guard let url = url else {
                    self.plugin?.handleDocumentPickerResult(urls: nil, error: self.plugin?.errorUnknown)
                    return
                }
                do {
                    let temporaryUrl = try self.saveTemporaryFile(url)
                    self.plugin?.handleDocumentPickerResult(urls: [temporaryUrl], error: nil)
                } catch {
                    self.plugin?.handleDocumentPickerResult(urls: nil, error: self.plugin?.errorTemporaryCopyFailed)
                }
            })
        } else if result.itemProvider.hasItemConformingToTypeIdentifier(UTType.image.identifier) {
            result.itemProvider.loadFileRepresentation(forTypeIdentifier: UTType.image.identifier, completionHandler: { url, error in
                if let error = error {
                    self.plugin?.handleDocumentPickerResult(urls: nil, error: error.localizedDescription)
                    return
                }
                guard let url = url else {
                    self.plugin?.handleDocumentPickerResult(urls: nil, error: self.plugin?.errorUnknown)
                    return
                }
                do {
                    let temporaryUrl = try self.saveTemporaryFile(url)
                    self.plugin?.handleDocumentPickerResult(urls: [temporaryUrl], error: nil)
                } catch {
                    self.plugin?.handleDocumentPickerResult(urls: nil, error: self.plugin?.errorTemporaryCopyFailed)
                }
            })
        } else {
            self.plugin?.handleDocumentPickerResult(urls: nil, error: self.plugin?.errorUnsupportedFileTypeIdentifier)
            return
        }
    }
}
