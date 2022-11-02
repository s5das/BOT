import Compressor from "compressorjs";


export default (file) => {
  let quality = 1;
  if (file.size < 1000 * 1000) {
    //小于1M
    quality = 0.8;
  } else if (file.size < 5000 * 1000) {
    //小于5M
    quality = 0.1;
  } else if (file.size < 10000 * 1000) {
    //小于10M
    quality = 0.01;
  } else {
    //大于10M
    quality = 0;
  }
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        console.log("🚀 ~ file: compress.js ~ line 25 ~ success ~ result", result)
        const formData = new FormData();
        formData.append("file", result, result.name);
        resolve(formData);
      },
      error(err) {
        reject(err);
      },
    });
  });
};
