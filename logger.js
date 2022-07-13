const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: 'DD-MM-YY HH:mm:ss' }), myFormat),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log', level: 'info' }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
});
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

const bcrypt = require("bcryptjs");

async function storeToDb() {
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync("$2a$10$LgDtEbKzf5XJ3XWsWNIK4umyERJDP6CbWGrVJWt6dgwpd3Iqy03E.", salt);
  console.log(hashedPassword);
  checkPassword("$2a$10$LgDtEbKzf5XJ3XWsWNIK4umyERJDP6CbWGrVJWt6dgwpd3Iqy03E.");
}

function checkPassword(userPassword){
  if (!bcrypt.compareSync(userPassword, "$2a$10$FnLMwV.Mwp0zB43XG5NBuOf/1JNM.u0nVDRn4UOyTLibbp3qE7C3a")){
    console.log("incorrect");
  }else{
    console.log("Correct")
  }
}
storeToDb()

// 123456 - $2a$10$fjrGqgOD0fdehyJygtzK3u0svfvLpI0sCstG8tgtgpcv75sbhVdZO


module.exports = logger;
