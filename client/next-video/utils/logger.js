import chalk from "chalk";
function base(type, ...messages) {
  console[type](...messages);
}
function info(...messages) {
  base("log", chalk.blue.bold("-"), ...messages);
}
function success(...messages) {
  base("log", chalk.green.bold("\u2713"), ...messages);
}
function add(...messages) {
  base("log", chalk.blue.green("+"), ...messages);
}
function warning(...messages) {
  base("log", chalk.yellow.bold("!"), ...messages);
}
function error(...messages) {
  base("error", chalk.red.bold("\u2717"), ...messages);
  base("log", "");
}
function space(...messages) {
  base("log", " ", ...messages);
}
function label(detail) {
  return chalk.magenta.bold(detail);
}
var logger_default = {
  base,
  info,
  success,
  add,
  warning,
  error,
  space,
  label
};
export {
  add,
  base,
  logger_default as default,
  error,
  info,
  label,
  space,
  success,
  warning
};
