#include <iostream>

int main() {
  auto total = 0;
  std::string input;
  while (std::cin >> input) {
    total += std::stoi(input);
  }
  std::cout << total << std::endl;
  return 0;
}
