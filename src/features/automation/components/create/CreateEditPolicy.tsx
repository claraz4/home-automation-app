import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";

interface CreateEditPolicyProps {
  name: string;
  headingText?: string;
  scrollToTop: () => void;
}

export default function CreateEditPolicy({
  name,
  scrollToTop,
  headingText,
}: CreateEditPolicyProps) {
  const isCreating = false;

  return (
    <View>
      <Heading variant="h2" hasBackButton={true}>
        {isCreating ? headingText : name}
      </Heading>
    </View>
  );
}
