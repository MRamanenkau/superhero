# Humble Superhero API Test task

<img width="636" alt="image" src="https://github.com/user-attachments/assets/152854de-5514-4a8f-b88c-731888a32b50" />

### Client repository

```
https://github.com/MRamanenkau/superhero-client
```

### Project setup

```bash
$ npm install
```

### Setup Redis
```bash
docker run -d --name redis -p 6379:6379 redis
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Objectives
✔️ Add a new superhero, specifying their name, superpower, and a "humility score" (e.g., a rating out of 10 that shows how humble they are).\
✔️ Fetch the list of superheroes, ordered by their humility score in descending order.

### What is done
✔️ NestJS is used as suggested.\
✔️ In-memory DB is integrated (Redis).\
✔️ POST /superheroes endpoint.\
✔️ GET /superheroes endpoint.\
✔️ React frontend app.\
✔️ Validation to ensure the humility score is a number between 1 and 10.\
✔️ Jest unit tests.\
✔️ Nice UI\
✔️ Websoket gateway (just for fun).

### Collaboration
To effectively collaborate, I would divide the responsibilities among teammates based on team size, experience, and interest. The work can be split into three main areas: Frontend, Backend, and Infrastructure. For each application, the responisbility can be splited basing on features or modules. In addition, there may be tasks related to technical improvements, integration, refactoring, support, and architectural design. Infrastructure-related tasks can be divided further based on the specific tool or service involved.

### Improvments
* Backend Code: Replace string literals with enums or a similar construct to improve type safety and maintainability.
* Optimizing Data Retrieval: Since the create/read ratio is typically skewed towards reads, the runtime performance of the findAll method could be improved by offloading sorting logic from read operations to the create method. This change could potentially reduce the time complexity of findAll from O(N * log(N)) to O(1) by maintaining a pre-sorted data structure.
* Frontend Performance: Use a library like React Virtualized to enhance performance when rendering large lists.
* Deployment: Utilize Docker Compose to simplify the deployment process.
* Database Persistence: Implement a persistent database instead of an in-memory solution.
* Caching: Integrate Redis as a caching layer to improve application performance.
   
   


