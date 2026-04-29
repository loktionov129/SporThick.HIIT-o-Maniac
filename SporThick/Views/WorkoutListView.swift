import SwiftUI

struct WorkoutListView: View {
    @State private var workouts = [Workout]()
    
    var body: some View {
        NavigationView {
            List(workouts) { workout in
                NavigationLink(destination: ContentView()) {
                    Text(workout.name)
                }
            }
            .navigationTitle("Тренировки")
            .toolbar {
                Button(action: {
                    // Заглушка для добавления тренировки
                    print("Добавить тренировку")
                }) {
                    Image(systemName: "plus")
                }
            }
        }
    }
}
