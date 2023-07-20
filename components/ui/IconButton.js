import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, color, size, onPress,ownStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed,ownStyle]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    //marginRight: 28,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
