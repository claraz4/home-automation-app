import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const plugWarning = (color: string, size: number) => {
  return (
    <FontAwesome6 name="plug-circle-exclamation" size={size} color={color} />
  );
};

export const plugStable = (color: string, size: number) => {
  return <FontAwesome6 name="plug-circle-check" size={size} color={color} />;
};
