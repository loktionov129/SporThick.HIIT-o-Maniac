import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello Watch!")
                .font(.title2)
            Text("SporThick HIIT")
                .font(.caption)
            Image(systemName: "heart.fill")
                .resizable()
                .frame(width: 40, height: 40)
                .foregroundColor(.red)
        }
        .padding()
    }
}
