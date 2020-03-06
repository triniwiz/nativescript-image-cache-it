import Foundation
extension NSURL {
public var uuid: String? {
 private struct NSURLProps{
            static var uuid: String? = nil
        }
get {
return objc_getAssociatedObject(self, &NSURLProps.uuid) as? String
}
set{
 if let unwrappedValue = newValue{
                    objc_setAssociatedObject(self, &NSURLProps.uuid, unwrappedValue as NSString?, .OBJC_ASSOCIATION_RETAIN_NONATOMIC)
                }
}
}
}
