import { useEffect, useState } from "react";
import { Font } from 'react-native';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    
    useEffect(() => {
      async function loadResourcesAndDataAsync() {
        try {
        //   SplashScreen.preventAutoHideAsync();
  
          // Load fonts
          await Font.loadAsync({
            'fontLight': require('../assets/fonts/interLight.ttf'),
            'fontRegular': require('../assets/fonts/interRegular.ttf'),
            'fontSemiBold': require('../assets/fonts/interSemiBold.ttf'),
            'fontBold': require('../assets/fonts/interBold.ttf'),
          });
        } catch (e) {
          // We might want to provide this error information to an error reporting service
          console.warn(e);
        } finally {
          setLoadingComplete(true);
        //   SplashScreen.hideAsync();
        }
      }
  
      loadResourcesAndDataAsync();
    }, []);
  
    return { isLoadingComplete };