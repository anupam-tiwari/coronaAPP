
import { WebView } from 'react-native-webview';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
   
   export default class App extends React.Component {
     state = {
       isSplashReady: false,
       isAppReady: false,
     };
   
     render() {
       if (!this.state.isSplashReady) {
         return (
           <AppLoading
             startAsync={this._cacheSplashResourcesAsync}
             onFinish={() => this.setState({ isSplashReady: true })}
             onError={console.warn}
             autoHideSplash={false}
           />
         );
       }
   
       if (!this.state.isAppReady) {
         return (
           <View style={{ flex: 1 }}>
             <Image
               source={require('./assets/images/CoronApp.png')}
               onLoad={this._cacheResourcesAsync}
             />
           </View>
         );
       }
   
       return (
        <WebView source={{ uri: 'https://www.coronapp.io/' }} />
       );
     }
   
     _cacheSplashResourcesAsync = async () => {
       const gif = require('./assets/images/CoronApp.png');
       return Asset.fromModule(gif).downloadAsync();
     };
   
     _cacheResourcesAsync = async () => {
       SplashScreen.hide();
       const images = [
         require('./assets/images/CoronApp.png'),
         require('./assets/images/CoronApp.png'),
       ];
   
       const cacheImages = images.map(image => {
         return Asset.fromModule(image).downloadAsync();
       });
   
       await Promise.all(cacheImages);
       this.setState({ isAppReady: true });
     };
   }
   