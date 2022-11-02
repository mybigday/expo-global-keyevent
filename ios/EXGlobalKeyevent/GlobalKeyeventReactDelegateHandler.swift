import ExpoModulesCore

public class GlobalKeyeventReactDelegateHandler: ExpoReactDelegateHandler {
  public override func createRootViewController(reactDelegate: ExpoReactDelegate) -> UIViewController? {
    return RNGlobalKeyEventViewController(defaultScreenOrientationFromPlist: ())
  }
}