#include <iostream>

int main() {
  std::string polymer;
  std::cin >> polymer;
  for (auto done = false; !done;) {
    done = true;
    for (auto i = 0; i < polymer.size() - 1; ++i) {
      if (std::abs(polymer[i] - polymer[i + 1]) == 32) {
        polymer.erase(i--, 2);
        done = false;
      }
    }
  }
  std::cout << polymer.size() << std::endl;
  return 0;
}
