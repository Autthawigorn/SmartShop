//
//  DTOs.swift
//  SmartShop
//
//  Created by Autthawigorn Yortpiboot on 26/10/2568 BE.
//

import Foundation

struct RegisterResponse: Codable {
    let message: String?
    let success: Bool
}

struct ErrorResponse: Codable {
    let message: String?
}
