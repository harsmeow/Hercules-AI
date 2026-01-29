export function fakeChatApi(input) {
  return new Promise(resolve =>
    setTimeout(() => resolve("AI reply to: " + input), 800)
  );
}
