export const requestPermissionsAsync = jest.fn(() =>
  Promise.resolve({ status: 'granted' }) // ✅ return mock status
);

export const getExpoPushTokenAsync = jest.fn(() =>
  Promise.resolve({ data: 'mock-token' })
);

export const scheduleNotificationAsync = jest.fn();
export const cancelAllScheduledNotificationsAsync = jest.fn();
export const addNotificationReceivedListener = jest.fn();
export const addNotificationResponseReceivedListener = jest.fn();
export const removeNotificationSubscription = jest.fn();
export const setNotificationHandler = jest.fn();