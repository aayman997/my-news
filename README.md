<h1 align="center" id="title">My news</h1>

<p align="center"><img src="https://socialify.git.ci/aayman997/my-news/image?language=1&amp;owner=1&amp;name=1&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">a news aggregator website that pulls articles from various sources and displays them in a clean easy-to-read format</p>



<h2>🧐 Features</h2>

Here're some of the project's best features:

*   User authentication and registration
*   Article search and filtering
*   Personalized news feed
*   Mobile-responsive design


<h2>🌐 Data sources used</h2>

Here is the api used in this project:

* [NewsAPI.org](https://newsapi.org/)
* [New York Times](https://developer.nytimes.com/apis)
* [The Guardian](https://open-platform.theguardian.com/)

<h2>🛠️ Installation Steps:</h2>

<p>1. Create a .env file in the root "/my-news/.env" directory and put the environment variables sent in the email in this file</p>

```
VITE_NEWSAPI_URL=https://newsapi.org/v2/
VITE_NEWSAPI_API_KEY=
VITE_THEGUARDIAN_URL=https://content.guardianapis.com/
VITE_THEGUARDIAN_API_KEY=
VITE_NYTIMES_URL=https://api.nytimes.com/
VITE_NYTIMES_API_KEY=
```
_Some time the APIs requestes Exceed the limit, so if this happens, please contact me or create your own API keys_

<p>2. Run using docker "Development"</p>

```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build
```

<p>3. Run using docker "Production"</p>

```
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
```

<p>4. Local development server "vite"</p>

```
npm run dev
```

<p>5. Local production preview server "vite"</p>

```
npm run build
npm run preview
```



<h2>💻 Built with</h2>

Technologies used in the project:

*   React.js
*   tailwindcss
*   tanstack/react-query
*   react-hook-form
*   react-icons
*   react-js-pagination
*   react-router-dom
*   typescript
*   vite
