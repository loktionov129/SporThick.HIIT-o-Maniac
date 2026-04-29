import WatchKit
import Foundation

class WorkoutController: ObservableObject {
    @Published var currentWorkout: Workout?
    @Published var currentExerciseIndex = 0
    @Published var currentRound = 1
    @Published var isRunning = false
    @Published var remainingTime: Int = 0
    
    private var timer: Timer?
    private var exercises: [Exercise] = []
    
    // MARK: - Public Methods
    
    func startWorkout(_ workout: Workout) {
        currentWorkout = workout
        exercises = workout.exercises
        currentExerciseIndex = 0
        currentRound = 1
        startCurrentExercise()
        isRunning = true
    }
    
    func pauseWorkout() {
        timer?.invalidate()
        isRunning = false
    }
    
    func resumeWorkout() {
        startTimer()
        isRunning = true
    }
    
    func skipExercise() {
        goToNextExercise()
    }
    
    func stopWorkout() {
        timer?.invalidate()
        isRunning = false
        currentWorkout = nil
        currentExerciseIndex = 0
        currentRound = 1
    }
    
    // MARK: - Private Methods
    
    private func startCurrentExercise() {
        guard let exercise = exercises[safe: currentExerciseIndex] else {
            goToNextRound()
            return
        }
        remainingTime = exercise.duration
        startTimer()
    }
    
    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 1, repeats: true) { [weak self] _ in
            guard let self = self else { return }
            
            if self.remainingTime > 0 {
                self.remainingTime -= 1
            } else {
                self.goToNextExercise()
            }
        }
    }
    
    private func goToNextExercise() {
        currentExerciseIndex += 1
        
        if currentExerciseIndex < exercises.count {
            startCurrentExercise()
        } else {
            goToNextRound()
        }
    }
    
    private func goToNextRound() {
        currentExerciseIndex = 0
        
        // Проверяем, нужно ли начинать новый круг
        if currentWorkout?.rounds == 1 || currentRound < (currentWorkout?.rounds ?? 1) {
            currentRound += 1
            startCurrentExercise()
        } else {
            stopWorkout()
        }
    }
}

// Расширение для безопасного доступа к элементам массива
extension Array {
    subscript(safe index: Int) -> Element? {
        indices.contains(index) ? self[index] : nil
    }
}
