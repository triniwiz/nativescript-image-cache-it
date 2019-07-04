import Foundation
import Metal
import MetalKit

public class ImageHandler: NSObject {
    @objc public static func clearColor(view: MTKView){
        view.clearColor = MTLClearColorMake(0.0, 0.0, 0.0, 1.0)
    }
}
