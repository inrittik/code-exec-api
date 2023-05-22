# Code-Exec-API

A free api for executing code in different programming languages (Still in development)

## Local Setup
1. Install Docker from https://docs.docker.com/get-docker/

2. Clone the repo into a public GitHub repository
   ```sh
   git clone https://github.com/inrittik/code-exec-api.git
   ```

3. Go to the project folder
   ```sh
   cd code-exec-api
   ```
   
4. Setup the env file
  ```sh
   cp .env.example .env
   ```

5. Start your docker container
  ```
  docker-compose up -d --build
  ```
  
This will startup the local server at http://localhost:3000


## Routes
- Get: `/languages` 

  Get list of langauges supported [C, C++, Java, Python, GoLang, C#]
  
- Post: `/execute`

  execute your code and fetch output results.
  
  Parameters:
  - code
  - language
  - input
  
  Output:
  - timestamp
  - status
  - result
    - output
    - error
  - language
  - info
