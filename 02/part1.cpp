#include <iostream>
#include <unordered_map>

int main() {
  auto twos{0}, threes{0};
  std::string input;
  while (std::cin >> input) {
    std::unordered_map<char, int> char_count;
    for (auto c : input) {
      ++char_count[c];
    }
    auto has_twos{false}, has_threes{false};
    for (auto [c, count] : char_count) {
      has_twos |= count == 2;
      has_threes |= count == 3;
      if (has_twos && has_threes) {
        break;
      }
    }
    twos += has_twos;
    threes += has_threes;
  }
  std::cout << twos * threes << std::endl;
  return 0;
}
