const fetch = require('node-fetch');

// job starts at 12:00pm UTC each day and runs for 14 hours
// 5:00 am AZ time - 7:00 pm AZ time
// pings listed DYNO_URLS every 'interval' minutes (default 
// is 25 minutes since heroku apps sleep after 30 minutes of non-use)

const hours = 0.1
const start = Date.now();
const end = start + (hours * 60 * 60 * 1000)

const DYNO_URLS = [
    "https://killian-yummy.herokuapp.com/",
]

const interval = 0.5

const timeouts = []

const keepAwake = (urls, interval= 25) => {
  const milliseconds = interval * 60000

  if (Date.now() < end) {
    urls.forEach((url, i) => {
      timeouts.push(
        setTimeout(() => {
          try {
            fetch(url).then(() => console.log(`Pinging ${url}`)); 
          } catch (error) {
            console.log('Error pinging ' + url + ' .Will try again in ' + interval + ' minutes.')
          } finally {
            return keepAwake(urls, interval);
          }
        }, milliseconds)
      )
    });
  } else {
    timeouts.forEach(timeout => {
      clearTimeout(timeout)
    })
    console.log('Stopping keep-awake until heroku scheduler starts it again')
  }
}

console.log('Starting keep-awake to ping each of these URLs every ' + interval + ' minutes: ')
DYNO_URLS.forEach(url => {
  console.log(url)
})
console.log('\n')
keepAwake(DYNO_URLS, interval)