Provision a Heroku Scheduler job to start at 12:00pm UTC each day
Setup Heroku Scheduler job to run using this command: node bin/herokuKeepAwake.js

The application then runs for 14 hours:
5:00 am AZ time - 7:00 pm AZ time
pings listed DYNO_URLS every 'interval' minutes (default  is 25 minutes since heroku apps sleep after 30 minutes of non-use)

To see logs: heroku logs --tail --app= appName