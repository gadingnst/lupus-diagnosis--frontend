/**
 * @format
 */

import React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

window.React = React
AppRegistry.registerComponent(appName, () => App)
