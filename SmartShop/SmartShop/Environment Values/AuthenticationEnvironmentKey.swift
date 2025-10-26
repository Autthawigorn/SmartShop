//
//  AuthenticationEnvironmentKey.swift
//  SmartShop
//
//  Created by Autthawigorn Yortpiboot on 26/10/2568 BE.
//

import Foundation
import SwiftUI

private struct AuthenticationEnvironmentKey: EnvironmentKey {
    static let defaultValue = AuthenticationController(httpClient:HTTPClient())
}

extension EnvironmentValues {
    
    var authenticationController: AuthenticationController {
        get { self[AuthenticationEnvironmentKey.self] }
        set { self[AuthenticationEnvironmentKey.self] = newValue }
    }
    
}
