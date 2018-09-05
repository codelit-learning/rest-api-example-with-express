### Disclaimers
1. The code is not broken into routes, controllers etc. for maintaining brevity and keeping the code simple enough.

### Usage
```
yarn install
PORT=3000 yarn start
```

### Testing 
#### Post
```
curl -X POST -d '{"name": "rajat", "id": "1"}' -H "Content-Type: application/json" localhost:3000/users
```
