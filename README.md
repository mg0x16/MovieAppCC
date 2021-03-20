# MovieAppCC
Simple movie app for coding overview 

# Notes
Tested Only On Android

# How to run
install node modules dependencies
```
npm i
```

### Debug
make sure an emulator or a real devices is connected
```
adb devices
```
then run debug build
```
npx react-native start
npx react-native run-android
```

### Release
in the root folder run
```
cd ./android && ./gradlew assembleRelease && cd ..
```
you will find the apk build at
```
/android/app/build/outputs/apk/release
```

# How to test
### Unit / Integeration testing
```
npm test
```

### E2E testing
install detox-cli globally
```
npm install -g detox-cli
```
check your chosen emulator name
```
emulator -list-avds
```
replace your emulator name in the file (.detoxrc.json)
```
  "devices": {
    "emulator": {
      "type": "android.emulator",
      "device": {
        "avdName": "Pixel_3_API_28"
      }
    }
  },

```
build detox apk
```
detox build --configuration android
```

run detox tests
```
detox test --configuration android
```
