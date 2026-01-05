# DailyNeeds React Native App

This is a React Native conversion of the Ionic DailyNeeds Demo application. The app provides a platform for customers to manage their daily needs deliveries and for agents to manage orders.

## Features

### Customer Features
- Login with customer/agent selection
- Browse available items (Milk, Water, Curd, Groceries, etc.)
- View delivery history
- Submit update requests
- Request vacation holds
- Settings management

### Agent Features
- View and manage current orders
- Agent management dashboard
- Order assignment and tracking

## Project Structure

```
src/
├── screens/           # All screen components
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── CustomerScreen.tsx
│   ├── AgentScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── HistoryScreen.tsx
│   ├── UpdateRequestScreen.tsx
│   └── VacationRequestScreen.tsx
├── components/        # Reusable components (future use)
├── navigation/        # Navigation configuration (future use)
└── types/            # TypeScript type definitions
    └── index.ts
```

## Technologies Used

- **React Native** with **Expo**
- **TypeScript** for type safety
- **React Navigation** for navigation
- **React Native Safe Area Context** for safe area handling
- **React Native Gesture Handler** for gesture support

## Installation & Setup

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn
   - Expo CLI (`npm install -g @expo/cli`)

2. **Install Dependencies**
   ```bash
   cd DailyNeedsRN
   npm install
   ```

3. **Run the Application**
   ```bash
   # Start the development server
   npm start

   # Run on Android
   npm run android

   # Run on iOS (macOS only)
   npm run ios

   # Run on Web
   npm run web
   ```

## Conversion Notes

This React Native app was converted from an Ionic Angular application with the following key changes:

### UI Components Mapping
- **Ionic Cards** → React Native `View` with styling
- **Ionic Buttons** → React Native `TouchableOpacity`
- **Ionic Inputs** → React Native `TextInput`
- **Ionic Segments** → Custom segment component with `TouchableOpacity`
- **Ionic Lists** → React Native `FlatList`

### Navigation
- **Angular Router** → React Navigation Stack Navigator
- Route parameters and navigation methods adapted to React Navigation patterns

### Styling
- **Ionic CSS/SCSS** → React Native StyleSheet
- Responsive design using Flexbox
- Platform-specific styling where needed

### State Management
- **Angular Services** → React hooks (useState, useEffect)
- Local component state for form handling

## Key Screens

1. **LoginScreen** - User authentication with customer/agent selection
2. **HomeScreen** - Dashboard with item grid layout
3. **CustomerScreen** - Customer dashboard with quick actions and recent history
4. **AgentScreen** - Agent dashboard with orders and agent management
5. **HistoryScreen** - Complete delivery history
6. **UpdateRequestScreen** - Form for submitting update requests
7. **VacationRequestScreen** - Form for vacation/pause requests
8. **SettingsScreen** - App settings and preferences

## Future Enhancements

- Add API integration for real data
- Implement user authentication
- Add push notifications
- Implement offline support
- Add image picker for profile pictures
- Add date picker for vacation requests
- Implement real-time order tracking

## Development

To add new features:

1. Create new screen components in `src/screens/`
2. Add navigation routes in `App.tsx`
3. Update type definitions in `src/types/index.ts`
4. Follow the existing styling patterns

## Build for Production

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

## License

This project is for demonstration purposes.