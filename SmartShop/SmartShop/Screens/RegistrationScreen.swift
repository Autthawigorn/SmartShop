//
//  RegistrationScreen.swift
//  SmartShop
//
//  Created by Autthawigorn Yortpiboot on 26/10/2568 BE.
//

import SwiftUI

struct RegistrationScreen: View {
    @Environment(\.authenticationController) private var authenticationController
    
    @State private var username: String = ""
    @State private var password: String = ""
    
    private var isFormValid: Bool {
        !username.isEmptyOrWhitespace && !password.isEmptyOrWhitespace
    }
    
    private func register() async {
        
    }
    
    var body: some View {
        Form {
            TextField("User Name", text: $username)
                .textInputAutocapitalization(.never)
            SecureField("Password", text: $password)
            Button("Register") {
                Task {
                    await register()
                }
            }.disabled(!isFormValid)
        }.navigationTitle("Register")
    }
}

#Preview {
    NavigationStack {
        RegistrationScreen()
    }.environment(\.authenticationController, AuthenticationController(httpClient: .development))
}
