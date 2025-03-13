# React Native Base Setup

## 1. Cấu trúc thư mục

```
restaurantApp/
├── android/               # Mã nguồn Android
├── ios/                   # Mã nguồn iOS
├── src/                   # Mã nguồn chính
│   ├── components/        # Component tái sử dụng
│   ├── screens/           # Màn hình chính
│   ├── navigation/        # Điều hướng
│   ├── assets/            # Hình ảnh, biểu tượng
│   ├── utils/             # Hàm tiện ích
│   ├── hooks/             # Custom Hooks
│   ├── context/           # Redux/Context API
├── App.tsx                # Entry point
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── babel.config.js        # Babel config
├── metro.config.js        # Metro bundler config
├── jest.config.js         # Jest config
├── .eslintrc.js           # ESLint config
├── .prettierrc            # Prettier config
└── README.md              # Hướng dẫn
```

## 2. Cài đặt & chạy dự án

### MacBook

1. Cài đặt môi trường:
   ```sh
   brew install node watchman openjdk@17
   sudo gem install cocoapods
   echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

### Windows

1. Cài đặt môi trường:
   ```sh
   choco install nodejs openjdk17
   ```
   - Cài đặt **Android Studio** & cấu hình `ANDROID_HOME`, `JAVA_HOME`

### 2.1. Khởi tạo dự án

```sh
npx @react-native-community/cli init restaurantApp --template react-native-template-typescript
```

### 2.2. Cài đặt dependencies

```sh
cd restaurantApp
npm install
```

### 2.3. Cài đặt CocoaPods (iOS)

```sh
cd ios
pod install --repo-update
cd ..
```

### 2.4. Chạy ứng dụng

#### Chạy khởi đầu
```sh
npx react-native start --reset-cache
```

#### Android

```sh
npx react-native run-android
```

Nếu lỗi emulator:

```sh
~/Android/Sdk/emulator/emulator -avd Pixel_7_API_34
```

#### iOS

```sh
xed ios
cmd + B
```

## 3. Lỗi phổ biến & cách khắc phục

### ❌ `ERROR: JAVA_HOME is set to an invalid directory`

👉 **Fix:**

```sh
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

Thêm vào `~/.zshrc` (Mac) hoặc `~/.bashrc` (Windows WSL).

### ❌ `error Failed to build iOS project. "xcodebuild" exited with error code '70'`

👉 **Fix:**

```sh
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
cd ios && pod install --repo-update && cd ..
```

### ❌ `Couldn’t find template.config.js`

👉 **Fix:**

```sh
rm -rf ~/.npm/_npx ~/.npm/_cacache
npx clear-npx-cache
```

### ❌ Emulator Android không khởi động

👉 **Fix:**

```sh
npx react-native doctor
~/Android/Sdk/emulator/emulator -avd Pixel_7_API_34
```

## 📌 Ghi chú

- Chạy `npx react-native doctor` kiểm tra môi trường.
- Dùng **Node.js LTS** tránh lỗi.
- Nếu lỗi, thử `npm cache clean --force` rồi cài lại dự án.

🚀 **Chúc bạn thành công!**

