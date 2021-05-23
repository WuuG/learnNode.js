const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question() {
  return new Promise((resolve, reject) => {
    rl.question('what my name ?', (answer) => {
      if (answer == 'wuug') {
        resolve()
      } else {
        reject()
      }
    })
  });
}
(async function three_qa() {
  for (let i = 0; i < 3; i++) {
    try {
      await question()
      console.log('corret,thanks my bf');
      rl.close()
      break
    }
    catch (error) {
      console.log('try against');
      if (i == 2) {
        console.log('am i your friend ?');
      }
    }
  }
  rl.close()
})()