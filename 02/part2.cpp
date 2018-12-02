#include <iostream>
#include <optional>
#include <set>

constexpr auto kMaxDiff = 'z' - 'a';

std::optional<std::string> checkClose(const std::string &lhs, const std::string &rhs) {
  for (auto i = 0; i < lhs.size(); ++i) {
    if (lhs[i] == rhs[i]) {
      continue;
    }
    if (lhs.substr(i + 1) == rhs.substr(i + 1)) {
      return lhs.substr(0, i) + lhs.substr(i + 1);
    }
    return {};
  }
  return {};
}

int main() {
  std::string input;
  std::set<std::pair<int, std::string>> checksums;
  while (std::cin >> input) {
    auto checksum = 0;
    for (auto c : input) {
      checksum += c - 'a';
    }
    checksums.emplace(checksum, input);
  }
  for (auto lhs = checksums.begin(); lhs != std::prev(checksums.end()); ++lhs) {
    for (auto rhs = std::next(lhs); rhs != checksums.end(); ++rhs) {
      if (rhs->first - lhs->first > kMaxDiff) {
        break;
      } else if (auto id = checkClose(lhs->second, rhs->second)) {
        std::cout << id->c_str() << std::endl;
        return 0;
      }
    }
  }
  return 1;
}
