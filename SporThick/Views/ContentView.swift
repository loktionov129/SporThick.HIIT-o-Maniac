import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello World!")
                .font(.title)
                .padding()
            Text("Это приложение для HIIT‑тренировок")
                .font(.body)
            Spacer()
            Image(systemName: "figure.run")
                .resizable()
                .frame(width: 100, height: 100)
                .foregroundColor(.green)
        }
        .padding()
    }
}
