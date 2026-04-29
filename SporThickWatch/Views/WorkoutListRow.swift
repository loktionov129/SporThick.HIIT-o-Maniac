import SwiftUI

struct WorkoutListRow: View {
    let workout: Workout
    
    var body: some View {
        HStack {
            Text(workout.name)
            Spacer()
            Text("\(workout.exercises.count) упр.")
                .font(.caption)
                .foregroundColor(.gray)
        }
    }
}
