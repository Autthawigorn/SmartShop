//
//  ContentView.swift
//  SmartShop
//
//  Created by Autthawigorn Yortpiboot on 20/10/2568 BE.
//

import SwiftUI

struct ContentView: View {
    
    @Environment(\.authenticationController) private var authenicationController
    
    var body: some View {
       RegistrationScreen()
    }
}

#Preview {
    NavigationStack {
        ContentView()
    }
}
