mkdir -p build
if [ $1 ]; then
  DAY=$(printf "%02d" $(basename $1))
else
  DAY=$(date +%d)
fi
g++ -DINPUT=\"$DAY/input\" -std=c++1z $DAY/part1.cpp -o build/${DAY}_1 && cat $DAY/input | build/${DAY}_1
if [ -f $DAY/part2.cpp ]; then
  g++ -DINPUT=\"$DAY/input\" -std=c++1z $DAY/part2.cpp -o build/${DAY}_2 && cat $DAY/input | build/${DAY}_2
fi
