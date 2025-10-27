//
//  DebugHelper.swift
//  SmartShop
//
//  Created by Autthawigorn Yortpiboot on 27/10/2568 BE.
//

import Foundation

func log(_ message: String, file: String = #file, line: Int = #line) {
    print("📘 [\(URL(fileURLWithPath: file).lastPathComponent):\(line)] \(message)")
}
