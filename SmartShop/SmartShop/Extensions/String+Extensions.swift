//
//  String+Extensions.swift
//  SmartShop
//
//  Created by Autthawigorn Yortpiboot on 26/10/2568 BE.
//

import Foundation

extension String {
    
    var isEmptyOrWhitespace: Bool {
        //ตัดช่องว่างและขึ้นบรรทัดใหม่ออกจากหัวท้ายของ string แล้วตรวจว่าเหลือว่างไหม
        self.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
    
}
