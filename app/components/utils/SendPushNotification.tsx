export const SendPushNotification = async (
  token: string,
  title: string,
  body: string,
  data?: any
) => {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: token,
      sound: 'default',
      title,
      body,
      data,
    }),
  });
};
