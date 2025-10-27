//
//  RegistrationScreen.swift
//  SmartShop
//
//  Created by Autthawigorn Yortpiboot on 26/10/2568 BE.
//

import SwiftUI

struct RegistrationScreen: View {
    @Environment(\.authenticationController) private var authenticationController
    @Environment(\.dismiss) private var dismiss
    
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var message: String = ""
    
    private var isFormValid: Bool {
        !username.isEmptyOrWhitespace && !password.isEmptyOrWhitespace
    }
    
    private func register() async {
        do {
            let response = try await authenticationController.register(username: username, password: password)
            log("reponse นะจ๊ะ \(response)")
            
            if response.success {
                // ✅ Only clear when successful
                username = ""
                password = ""
                dismiss()
            } else {
                message = response.message ?? ""
            }
        } catch {
            message = error.localizedDescription
        }
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
            }
            .disabled(!isFormValid)
            .alert("Error", isPresented: .constant(!message.isEmpty)) {
                Button("OK", role: .cancel) { message = "" }
            } message: {
                Text(message)
            }
        }
        .navigationTitle("Register")
    }
}

#Preview {
    NavigationStack {
        RegistrationScreen()
    }.environment(\.authenticationController, AuthenticationController(httpClient: .development))
}
