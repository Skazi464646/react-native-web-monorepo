# React Native & Web Monorepo

This is a monorepo setup for a React Native and Web project using Yarn workspaces, Expo, and ViteJS.

## Project Structure

```
react-native-web-monorepo/
├── packages/
│   ├── mobile/        # React Native app (Expo)
│   ├── web/           # Web app (create-react-app)
│   ├── shared/        # Shared business logic and components
├── package.json       # Root package.json with workspaces
├── yarn.lock          # Dependency lock file
├── babel.config.js    # Babel configuration
├── tsconfig.json      # TypeScript configuration
```

## Prerequisites

- Install **Node.js** (latest LTS version)
- Install **Yarn** globally:
  ```sh
  npm install -g yarn
  ```

## Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/react-native-web-monorepo.git
   cd react-native-web-monorepo
   ```

2. **Install Dependencies**
   ```sh
   yarn install
   ```

3. **Run the Web App**
   ```sh
   cd packages/web
   yarn start
   ```

4. **Run the Mobile App (Expo)**
   ```sh
   cd packages/mobile
   yarn start
   ```

## Adding Dependencies

- To install a package in a specific workspace:
  ```sh
  yarn workspace web add package-name
  ```

- To install a package in all workspaces:
  ```sh
  yarn add package-name -W
  ```



Run following command on the root while 

1.   rm -rf node_modules yarn.lock packages/*/node_modules
2.   yarn 
