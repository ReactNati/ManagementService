import { View, Button, Alert, Image, Text, StyleSheet } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/styles';
import OutlinedButton from '../ui/OutlinedButton';

function ImagePicker({ takeImageForm }) {
    const [imagePicked, setPickedImage] = useState('')
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    async function verifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'insuffiecent permission',
                'You need to grant camera permission to use the app'
            )
            return false;
        }
        return true;

    }
    async function takePhotohandler() {
        const hasPermission = verifyPermission();
        if (!hasPermission) {
            return;
        }
        const takePhoto = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        setPickedImage(takePhoto.assets[0].uri);
        takeImageForm(takePhoto.assets[0].uri)
        //console.log(takePhoto)
    }
    let imagePrevied = <Text>No image taken yet</Text>
    if (imagePicked) {
        imagePrevied = <Image style={styles.image} source={{ uri: imagePicked }} ></Image>
    }
    return (
        <View>
            <Text style={[styles.label]}>Take photo</Text>

            <View style={styles.imagePrevied}>
                {imagePrevied}
            </View>
            <OutlinedButton icon="camera" onPress={takePhotohandler}>Take a photo</OutlinedButton>

        </View>
    )
}
export default ImagePicker;

const styles = StyleSheet.create(
    {
        imagePrevied: {

            height: 200,
            marginVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primary100,
            borderRadius: 4,
            overflow: 'hidden',
            marginHorizontal: 4,
            marginVertical: 8
        },
        image: {
            width: '100%',
            height: '100%'
        },
        label: {
            fontSize: 12,
            color: 'white',
            marginHorizontal: 4,
            
          },
    }
)