import { Picker } from "@react-native-picker/picker";
import { fontWeight, colors } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { StyleSheet, View } from "react-native";

export interface AppPickerItem<T extends string | number> {
  label: string;
  value: T;
}

interface AppPickerProps<T extends string | number> {
  items: AppPickerItem<T>[];
  selectedValue: T;
  onSelectedValueChange: (selectedValue: T) => void;
  title?: string;
}

export default function AppPicker<T extends string | number>({
  items,
  selectedValue,
  onSelectedValueChange,
  title,
}: AppPickerProps<T>) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onSelectedValueChange(itemValue)}
        style={{ width: 100 }}
        itemStyle={{ fontFamily: fontWeight[400] }}
      >
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} />
        ))}
      </Picker>
      {title && (
        <AppText variant="body" style={styles.pickerTitle}>
          {title}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  pickerTitle: {
    fontFamily: fontWeight[500],
    fontSize: 18,
    color: colors.primary[400],
  },
});
