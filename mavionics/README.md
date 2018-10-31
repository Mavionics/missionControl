# mavionics

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```


## Stages
### Production
* Branch: master
* Firebase: mavionics (mavionics-a142a)
* URL: mavionics-a142a.firebaseapp.com
* Build: npm run build
* Deploy: firebase deploy -P default

### Development
* Branch: develop
* Firebase: mavionics-dev
* URL: https://mavionics-dev.firebaseio.com
* Build: npm run build --mode development
* Deploy: firebase deploy -P develop

### Test
Not implemented yet
* Firebase: mavionics-test 
* URL: 
* Build: npm run test:e2e --mode test




