# quipu_test
To run the api you will need several dependencies installes on your computer: sqlite3, ruby and rails. When installed, on the project root folder, execute:
```
cd api
rails db:migrate
rails s
```

To run the front you will need node.js and npm installed. When installed, on the project root folder, execute:
```
cd front
npm install
npm run build
serve -s build
```
