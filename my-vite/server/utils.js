const { Readable } = require("stream");

// koa中所有方法都是promise
async function readBody(stream) {
  if (stream instanceof Readable) {
    return new Promise((resolve) => {
      let res = "";
      stream.on("data", (chunk) => {
        res += chunk;
      });

      stream.on("end", () => {
        resolve(res);
      });
    });
  } else {
    return stream;
  }
}
module.exports = {
  readBody,
};
