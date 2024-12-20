import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'volunteam',
    slug: 'volunteam',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'cover',
        backgroundColor: '#031A62',
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.volunteam.app',
        buildNumber: '1',
        infoPlist: {
            NSLocationWhenInUseUsageDescription: 'This app needs access to location to show nearby volunteer events.',
            NSCameraUsageDescription: 'This app uses the camera to let you add pictures to events.',
            NSPhotoLibraryUsageDescription: 'This app accesses your photos to let you add them to events.',
        },
    },
    android: {
        package: 'com.volunteam.app',
        versionCode: 1,
        adaptiveIcon: {
            foregroundImage: './assets/icon.png',
            backgroundColor: '#031A62',
        },
        permissions: [
            'ACCESS_FINE_LOCATION',
            'ACCESS_COARSE_LOCATION',
            'CAMERA',
            'READ_EXTERNAL_STORAGE',
            'WRITE_EXTERNAL_STORAGE',
        ],
    },
    web: {
        favicon: './assets/favicon.png',
    },
    plugins: [
        [
            'expo-image-picker',
            {
                photosPermission: 'The app accesses your photos to let you add them to events.',
                cameraPermission: 'The app accesses your camera to let you add pictures to events.',
            },
        ],
    ],
    extra: {
        eas: {
            projectId: '954f3b8e-1155-4f8f-8601-a2b3126da39e',
        },
        IMGBB_API_KEY: process.env.IMGBB_API_KEY || '9c51a3a2c427154e10112b17e4d5a2e0',
    },
});
