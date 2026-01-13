import { FlatList, View } from "react-native";
import Chip from "@/src/shared/components/Chip";
import { spaces } from "@/src/theme";

interface ChipOptionsProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

// In the case where the last row doesn't contain all the columns - Avoid the chips stretching too much
function padData(data: string[], columns: number): string[] {
  const remainder = data.length % columns;
  if (remainder === 0) return data;

  const fillers = Array(columns - remainder).fill(null);
  return [...data, ...fillers];
}

export default function ChipOptions({
  options,
  selectedOption,
  setSelectedOption,
}: ChipOptionsProps) {
  const paddedOptions = padData(options, 3);

  return (
    <FlatList
      data={paddedOptions}
      numColumns={3}
      keyExtractor={(item) => item}
      columnWrapperStyle={{ gap: spaces.sm }}
      ItemSeparatorComponent={() => <View style={{ height: spaces.sm }} />}
      renderItem={({ item }) => {
        if (!item) {
          return <View style={{ flex: 1 }} />; // invisible spacer
        }
        return (
          <View style={{ flex: 1 }}>
            <Chip
              text={item}
              isSelected={selectedOption === item}
              onPress={() => setSelectedOption(item)}
            />
          </View>
        );
      }}
    />
  );
}
