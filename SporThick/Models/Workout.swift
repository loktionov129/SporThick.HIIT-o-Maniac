import Foundation

struct Workout: Identifiable, Codable {
    let id = UUID()
    var name: String
    var exercises: [Exercise]
    var rounds: Int // 1 = бесконечность
    
    init(name: String = "Новая тренировка", exercises: [Exercise] = [], rounds: Int = 1) {
        self.name = name
        self.exercises = exercises
        self.rounds = rounds
    }
}
