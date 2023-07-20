import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/styles';
function OutlinedButton({ onPress, icon, children }) {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons style={styles.icon} name={icon} size={18} color={'white'}></Ionicons>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}
export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        flex:1
    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: 'white'
    }
})