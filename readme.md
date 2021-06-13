# NextGen Image Service

### Generate WebP, AVIF and JPG format at request time!

### Set up

Not much to it. Use the dockerfile to start the container. Dependencies are set up a build time. By default the service will start at http://localhost:28087.

### Allowing domains

You must specify the domains that are permitted origins for this service (this prevents abuse!); `./config.js` has an empty array waiting for you.
