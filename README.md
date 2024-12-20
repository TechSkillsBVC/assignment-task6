# Volunteam App

A React Native mobile application that connects volunteers with local events and opportunities. Built with Expo and TypeScript, this app provides a seamless experience for both event organizers and volunteers.

## Features

- User authentication and profile management
- Interactive map view of volunteer events
- Event creation and management
- Image upload capabilities
- Offline data caching
- Cross-platform compatibility (iOS and Android)

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS development)
- Android Studio (for Android development)
- ImgBB API key for image uploads
- JSON Server for development

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd volunteam
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```
   IMGBB_API_KEY=your_imgbb_api_key_here
   ```

## Development Setup

### Setting up the Development Server (json-server)

1. Get your computer's IP address
2. Update `src/services/api.ts` with your IP address:
   ```typescript
   baseURL: 'http://your_ip_address_here:3333'
   ```

3. Start the JSON server:
   ```bash
   npx json-server --watch db.json --port 3333 --host 192.168.1.86 -m ./node_modules/json-server-auth
   ```

Alternative: Use my-json-server for online hosting:
```typescript
baseURL: 'https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>'
```

### Setting up Image Upload (ImgBB)

1. Sign up at https://imgbb.com/signup
2. Get your API key from the dashboard
3. For local development, start the app with:
   ```bash
   IMGBB_API_KEY="9c51a3a2c427154e10112b17e4d5a2e0" npx expo start
   ```

## Deployment

### Prerequisites
- Expo account (create one at https://expo.dev/signup)
- EAS CLI (`npm install -g eas-cli`)
- Apple Developer account (for iOS)
- Google Play Developer account (for Android)

### Configuration

1. Login to Expo:
   ```bash
   eas login
   ```

2. Configure your project:
   ```bash
   eas build:configure
   ```

3. Push environment secrets:
   ```bash
   eas secret:push
   ```

### Building for iOS

1. Configure iOS credentials:
   ```bash
   eas credentials
   ```

2. Build for iOS:
   ```bash
   eas build --platform ios
   ```

3. Submit to App Store:
   ```bash
   eas submit --platform ios
   ```

### Building for Android

1. Build for Android:
   ```bash
   eas build --platform android
   ```

2. Submit to Play Store:
   ```bash
   eas submit --platform android
   ```

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## Maintenance Tips

### Code Quality
- Run ESLint regularly:
  ```bash
  npm run lint
  # or
  yarn lint
  ```
- Keep dependencies updated:
  ```bash
  npm outdated
  npm update
  ```

### Performance Optimization
- Use the React DevTools Profiler to identify performance bottlenecks
- Implement proper list virtualization using FlatList
- Optimize image assets using appropriate resolutions
- Implement proper caching strategies for API responses

### Troubleshooting Common Issues

1. Metro bundler issues:
   ```bash
   expo start --clear
   ```

2. Dependencies issues:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. iOS build issues:
   ```bash
   expo prebuild --clean
   ```

## Future Improvements

- Implement push notifications for event updates
- Add social sharing capabilities
- Enhance offline support
- Implement real-time chat features
- Add event categories and filtering

## Version History

- 1.0.0
  - Initial release
  - Basic event management functionality
  - Map integration
  - User authentication

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
