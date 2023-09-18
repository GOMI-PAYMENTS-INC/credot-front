export const checkUserDevice = () => {
  var UA = navigator.userAgent;
  return (
    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
  );
};
