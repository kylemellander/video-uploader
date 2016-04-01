# Video Uploader

This application gives a simple example of a video uploader in Ember that communicates with Rails backend.  In time, the hope is that this will turn into an Ember addon.

## Installation

To install a local copy, you will first need to clone this repo on your local environment.

`git clone https://github.com/kylemellander/video-uploader.git`

It has 2 separate installs here, an Ember app (located in 'frontend') and a Rails app (located in 'server').
First, to set up the server, in your terminal, go to the root of this repo in terminal.  Then:

* `cd server`
* `bundle`
* `rake db:create`
* `rake db:migrate`
* `thin start`

This will start the backend server

for the frontend, in a new Terminal window, go to the root of the repo and then:

* `cd frontend`
* `npm install`
* `bower install`
* `ember s --proxy http://localhost:3000`

If you set up the rails server to run on a different port, then proxy to the correct location.

Then you can visit `http://localhost:4200` to see the site.

## License

This is open source.  You are welcome to use it or contribute to it.  Have fun!

## Notes

* This app is purposefully kept simple on the backend to prevent bloat.  It could easily be added to a full Active Record Model, but because there is no use case for it now, it is being kept open.
* Limited addons were used in order to keep the process pure.  Some of these things might be better off if a library is used, but for the current case, I wanted to keep it as pure as possible.
