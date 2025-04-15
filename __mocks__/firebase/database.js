export const ref = jest.fn(() => 'mockRef');

export const get = jest.fn(() =>
  Promise.resolve({
    val: () => ({
      user1: { email: 'a@a.com' },
      user2: { email: 'b@b.com' },
    }),
  })
);

export const onValue = jest.fn((ref, callback) => {
  callback({
    val: () => ({
      chat1: { message: 'hi' },
      chat2: { message: 'yo' },
    }),
  });
  return () => {};
});
