import Foundation

struct Exercise: Identifiable, Codable {
    let id = UUID()
    var name: String
    var duration: Int // в секундах
    
    init(name: String = "Упр. 1", duration: Int = 30) {
        self.name = name
        self.duration = duration
    }
}
