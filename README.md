# URL Shortener

A web app that takes a URL and returns a shortened link that will redirect to the original link.

## Libraries Used

###### Client-side

- React
- Axios

###### Server-side

- Express
- CORS
- uuid

## How to Run

Simply run Run.sh in your terminal \([Node.js](https://nodejs.org/en) required\). The script will automatically install the necessary packages, build the front-end, and start the server.

#### If running via Docker

Run these two commands in your terminal:<br><br>
`docker build -t url_shortener .`<br>
`docker run -p 8080:8080 -t url_shortener`<br><br>
This will run the program at [http://localhost:8080](http://localhost:8080)
