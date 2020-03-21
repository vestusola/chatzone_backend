module.exports = function log(args) {
  return process.stdout.write(`[${new Date().toLocaleString()}] - ${args}\n`)
}