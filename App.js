import * as React from 'react';
import { useState,} from 'react';
import { View, StyleSheet, Button,Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [orientation, setOrientation] = React.useState(ScreenOrientation.Orientation.PORTRAIT_UP);
  const imageSrc = 'https://fastly.picsum.photos/id/1013/200/200.jpg?hmac=mW7QsQSZWgWOm8DAQ2zj3vcwbLk6w_AkeUOvEx7zI24'
  const [isPlay, setIsPlay] = useState(false);
  const [imageS, setImageS] = useState(false)
 

  // Lock the screen orientation to the current orientation
  React.useEffect(() => {
    async function lockOrientation() {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      if (currentOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    }
    lockOrientation();

    async function handleOrientationChange(newOrientation) {
      if (newOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
      setOrientation(newOrientation);
    }

    // Add event listener for orientation changes
    ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    // Remove event listener on unmount
    return () => {
      ScreenOrientation.removeOrientationChangeListener(handleOrientationChange);
    };
  }, []);

  async function handleOrientationChange(newOrientation) {
    if (newOrientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setOrientation(newOrientation);
  }


  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
       {status.isPlaying &&   <Image
          source={{ uri: 'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg' }}
          style={styles.image}
        />}
      
      </View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>{
             return status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            margin: 10,
          }}
          title={orientation === ScreenOrientation.Orientation.PORTRAIT_UP ? 'Landscape' : 'Portrait'}
          onPress={() =>
            orientation === ScreenOrientation.Orientation.PORTRAIT_UP ?
              handleOrientationChange(ScreenOrientation.Orientation.LANDSCAPE_RIGHT) :
              handleOrientationChange(ScreenOrientation.Orientation.PORTRAIT_UP)
          }
        ><Text style={{color:'white'}}>Orientation</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  image:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
