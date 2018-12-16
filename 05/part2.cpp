#include <iostream>

size_t removeAndReduce(std::string polymer, char type) {
  polymer.erase(
      std::remove_if(polymer.begin(), polymer.end(), [type](auto c) { return tolower(c) == type; }),
      polymer.end());
  for (auto done = false; !done;) {
    done = true;
    for (auto i = 0; i < polymer.size() - 1; ++i) {
      if (std::abs(polymer[i] - polymer[i + 1]) == 32) {
        polymer.erase(i--, 2);
        done = false;
      }
    }
  }
  return polymer.size();
}

int main() {
  std::string polymer;
  std::cin >> polymer;
  auto min = polymer.size();
  for (auto type = 'a'; type <= 'z'; ++type) {
    min = std::min(min, removeAndReduce(polymer, type));
  }
  std::cout << min << std::endl;
  return 0;
}
