# Steady for iOS

Steady is packaged as a Capacitor iOS app. The tracker is bundled locally, so logging works offline and data remains on the device. The Ask chatbot now uses a Netlify serverless function and the Anthropic Messages API. The Anthropic key stays on the server and is never included in the iOS app.

## Connect the chatbot

1. Push this project to a Git repository and deploy it as a Netlify site. `netlify.toml` builds the web app and deploys `netlify/functions/ask.mjs`.
2. In the Netlify site's environment variables, add `ANTHROPIC_API_KEY` as a secret. Optionally set `ANTHROPIC_MODEL`; the default is Claude Haiku 4.5.
3. Redeploy the Netlify site. Its chatbot endpoint is `https://YOUR-SITE.netlify.app/.netlify/functions/ask`. The chatbot works automatically in the hosted web app.
4. In Codemagic, create an environment variable group named `steady` and add `STEADY_CHAT_ENDPOINT` with that full endpoint URL. It is a URL, not a secret.
5. Build the `steady-ios-appstore` workflow. It embeds the endpoint into the app and produces a signed IPA artifact.

The function has a small in-memory request throttle. Set an Anthropic spend limit, and add persistent rate limiting and user authentication before a broad public launch.

## Build locally on macOS

1. Install Node.js 22 and Xcode with its command line tools.
2. Set `STEADY_CHAT_ENDPOINT` to the Netlify function URL.
3. Run `npm ci` and then `npm run sync:ios`.
4. Open `ios/App/App.xcworkspace` in Xcode, select your Apple Developer team, then archive and distribute to App Store Connect.

The Codemagic workflow creates a signed IPA artifact. It does not upload or submit it automatically.

## App behavior and data

- Tracker entries and chat history are stored locally on the device; there is no account sync or cloud backup.
- Chat messages are sent to Anthropic to generate replies. The app sends a limited summary of recent tracker data only if the user enables “Share my goals and recent logs”; it is off by default.
- AI meal estimation and weekly coaching still depend on Claude's artifact runtime and need separate integrations to work outside that runtime.
- Meal photo selection uses the iOS file/camera picker.
- The assistant gives general health information, not medical care. The app includes emergency and disordered-eating safety guidance.
