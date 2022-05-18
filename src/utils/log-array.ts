export default function logArray(object) {
  console.log(
    object instanceof Array
      ? object
          .map((val) => (typeof val === 'number' ? val.toFixed(4) : val))
          .join()
      : 'please input an array'
  );
}
