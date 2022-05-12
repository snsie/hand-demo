// from: https://google.github.io/mediapipe/solutions/hands.html
import DeviceDetector from 'device-detector-js';

export default function testSupport(supportedDevices: { client: string }[]) {
  const deviceDetector = new DeviceDetector();
  const detectedDevice = deviceDetector.parse(navigator.userAgent);

  let isSupported = false;
  for (const device of supportedDevices) {
    if (device.client !== undefined) {
      const re = new RegExp(`^${device.client}$`);
      if (!re.test(detectedDevice.client!.name)) {
        continue;
      }
    }

    isSupported = true;
    break;
  }
  if (!isSupported) {
    alert(
      `This demo, running on ${detectedDevice.client!.name} ` +
        `is not supported at this time. This demo relies on the OffscreenCanvas API, ` +
        `which is only supported in Chrome.`
    );
  }
}