#include <fstream>
#include <iostream>
#include <unordered_set>

int main() {
  auto total = 0;
  std::unordered_set<int> seen{total};
  for (;;) {
    std::ifstream ifs{INPUT};
    std::string input;
    while (ifs >> input) {
      total += std::stoi(input);
      if (seen.count(total)) {
        std::cout << total << std::endl;
        return 0;
      }
      seen.insert(total);
    }
  }
}
