# RestaurantApp - React Native Setup Guide

## Project Structure
```
restaurantApp/
│-- android/               # Android-specific project files
│-- ios/                   # iOS-specific project files
│-- node_modules/          # Installed npm packages
│-- src/                   # Source code directory
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   ├── navigation/        # React Navigation setup
│   ├── assets/            # Images, fonts, etc.
│   ├── utils/             # Helper functions and utilities
│   ├── store/             # State management (Redux, Context API, etc.)
│-- .gitignore             # Files ignored by Git
│-- App.tsx                # Root component
│-- package.json           # Dependencies and project info
│-- tsconfig.json          # TypeScript configuration
│-- babel.config.js        # Babel configuration
│-- metro.config.js        # Metro bundler configuration
│-- README.md              # Project documentation
```

## Prerequisites
### Install Required Tools
#### MacOS:
```sh
brew install node
brew install watchman
sudo gem install cocoapods
```
#### Windows:
- Install Node.js from [Node.js Official Website](https://nodejs.org/)
- Install [Chocolatey](https://chocolatey.org/install) and run:
  ```sh
  choco install -y nodejs-lts openjdk11
  ```
- Install Android Studio and set up the Android SDK.

## Setup Project
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/restaurantApp.git
   cd restaurantApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Setup iOS dependencies (MacOS only):
   ```sh
   cd ios
   pod install --repo-update
   cd ..
   ```

## Running the App
### Android:
1. Start Metro bundler:
   ```sh
   npx react-native start
   ```
2. Run on an Android device/emulator:
   ```sh
   npx react-native run-android
   ```

### iOS (MacOS only):
1. Start Metro bundler:
   ```sh
   npx react-native start
   ```
2. Run on an iOS simulator:
   ```sh
   npx react-native run-ios
   ```

## Troubleshooting
- If Metro bundler is not running, manually start it with `npx react-native start`.
- If Android emulator does not launch, manually start it from **Android Studio > AVD Manager**.
- If iOS build fails, try:
  ```sh
  cd ios
  pod install --repo-update
  cd ..
  ```

## Additional Notes
- Use TypeScript for development (`.tsx` and `.ts` files).
- Ensure `ANDROID_HOME` and `JAVA_HOME` are properly set for Android development.
- Check `npx react-native doctor` for missing dependencies.
- Use `npm run lint` to check for linting errors.

Happy Coding! 🚀

