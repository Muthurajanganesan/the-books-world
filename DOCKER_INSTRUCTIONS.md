# TheBooksWorld Docker Instructions

This guide provides step-by-step instructions on how to build, run, and push your application using Docker.

## Prerequisites

- **Docker Desktop**: Ensure Docker Desktop is installed and running on your machine.
- **Docker Hub Account**: If you plan to push images to the cloud, you need an account at [hub.docker.com](https://hub.docker.com/).

## Part 1: Running Locally

The easiest way to run your project is using `docker-compose`, which handles both the frontend, backend, and database together.

### 1. Build and Run
Open your terminal (PowerShell or Command Prompt) in the `TheBooksWorld` directory and run:

```bash
docker-compose up --build
```

- `--build`: Forces Docker to rebuild the images (useful if you changed code).
- This will start the Backend (port 8080), Frontend (port 3000), and Database (port 3307).

### 2. Access the Application
- **Frontend**: Open [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080](http://localhost:8080)

### 3. Stop the Application
To stop the containers, press `Ctrl+C` in the terminal, or run:

```bash
docker-compose down
```

---

## Part 2: Pushing to Docker Hub

If you want to push your images to Docker Hub (to share them or deploy externally), follow these steps.

### 1. Login to Docker Hub
In your terminal, run:
```bash
docker login
```
Enter your Docker Hub username and password/token when prompted.

### 2. Tag Your Images
You need to tag your local images with your Docker Hub username.
First, check your image names:
```bash
docker images
```
(Look for `thebooksworld-backend` and `thebooksworld-frontend`).

Assuming your Docker Hub username is `yourusername`:

**Backend:**
```bash
docker tag thebooksworld-backend:latest yourusername/thebooksworld-backend:latest
```

**Frontend:**
```bash
docker tag thebooksworld-frontend:latest yourusername/thebooksworld-frontend:latest
```

### 3. Push to Docker Hub
Now push the tagged images:

```bash
docker push yourusername/thebooksworld-backend:latest
docker push yourusername/thebooksworld-frontend:latest
```

### 4. Verify
Go to [hub.docker.com](https://hub.docker.com/) and check your repositories to see the pushed images.

---

## Troubleshooting

- **Database Connection**: The backend connects to the database host named `db` (as defined in `docker-compose.yml`). This is correct for internal Docker networking.
- **Port Conflicts**: If ports 3000, 8080, or 3307 are in use, modify the `ports` section in `docker-compose.yml` (e.g., `"3001:80"` for frontend).
