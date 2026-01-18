import { Modal, View, Pressable, StyleSheet, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { Heading } from "@/src/shared/ui/Heading";
import Ionicons from "@expo/vector-icons/Ionicons";
import { borderRadius, colors, spaces } from "@/src/theme";
import SegmentedControl from "@/src/shared/components/SegmentedControl";
import Checkbox from "@/src/shared/components/Checkbox";
import { AllPlugsDTO } from "@/src/features/schedule/types/AllPlugsDTO";
import { api } from "@/src/api/api";
import Button from "@/src/shared/components/Button";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import AppModal from "@/src/shared/components/AppModal";

interface AddPlugModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onPlugs: SmallBasePlug[];
  offPlugs: SmallBasePlug[];
  setOnPlugs: (plugs: SmallBasePlug[]) => void;
  setOffPlugs: (plugs: SmallBasePlug[]) => void;
}

export default function AddPlugModal({
  visible,
  setVisible,
  onPlugs,
  offPlugs,
  setOnPlugs,
  setOffPlugs,
}: AddPlugModalProps) {
  const modes = ["Turn ON", "Turn OFF"];
  const [allPlugs, setAllPlugs] = useState<AllPlugsDTO>();
  const [modeSelected, setModeSelected] = useState(modes[0]);
  const [plugsSelected, setPlugsSelected] = useState<SmallBasePlug[]>([]);

  // Update the selected plugs
  useEffect(() => {
    if (modeSelected === modes[0]) {
      setPlugsSelected(onPlugs);
    } else {
      setPlugsSelected(offPlugs);
    }
  }, [modeSelected, onPlugs, offPlugs]);

  // Filter the plugs
  const filteredPlugs = useMemo(() => {
    if (!allPlugs) return [];

    return modeSelected === modes[0]
      ? allPlugs.plugs.filter((plug) => !offPlugs.some((p) => p.id === plug.id))
      : allPlugs.plugs.filter((plug) => !onPlugs.some((p) => p.id === plug.id));
  }, [modeSelected, allPlugs, onPlugs, offPlugs]);

  // Get all plugs
  const getPlugs = async () => {
    try {
      const res = await api.get<AllPlugsDTO>("/plugs");
      setAllPlugs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getPlugs();
  }, []);

  // Add the new plugs
  const addPlugs = () => {
    if (modeSelected === modes[0]) {
      setOnPlugs(plugsSelected);
    } else {
      setOffPlugs(plugsSelected);
    }

    setVisible(false);
  };

  return (
    <AppModal visible={visible} setVisible={setVisible} isBottom={false}>
      <View style={styles.subContainer}>
        <Heading variant="h5">Mode</Heading>
        <SegmentedControl
          options={modes}
          value={modeSelected}
          onPress={(mode) => setModeSelected(mode)}
          style={{ width: "100%", height: 35 }}
        />
      </View>
      <View style={styles.subContainer}>
        <Heading variant="h5">Select Plugs</Heading>
        {filteredPlugs && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.checkboxContainer}
          >
            {filteredPlugs.map((plug) => {
              const isSelected = plugsSelected.some((p) => p.id === plug.id);

              return (
                <Checkbox
                  key={plug.id}
                  value={plug.name}
                  isSelected={isSelected}
                  setIsSelected={() =>
                    setPlugsSelected(
                      (prev) =>
                        isSelected
                          ? prev.filter((p) => p.id !== plug.id) // remove
                          : [...prev, { id: plug.id, name: plug.name }], // add
                    )
                  }
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <Button
        text="Add Plugs"
        onPress={addPlugs}
        invertColors
        style={{ marginTop: spaces.sm }}
      />
    </AppModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  sheet: {
    width: "90%",
    borderRadius: borderRadius.sm,
    backgroundColor: "white",
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.lg,
    rowGap: spaces.sm,
  },
  subContainer: {
    rowGap: spaces.xs,
    marginTop: spaces.xs,
  },
  checkboxContainer: {
    height: 165,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.sm,
  },
});
