# MERN Application Deployment Guide

## Prerequisites
- GitHub account with your repository
- Vercel account (free tier)
- Render account (free tier)
- MongoDB Atlas account (for cloud MongoDB)

---

## Part 1: Prepare MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new project

2. **Create a Cluster**
   - Click "Create" → Choose "Shared Tier" (Free)
   - Select a region close to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `akarsh` (or your choice)
   - Password: Create a strong password
   - Click "Add User"

4. **Get Connection String**
   - Go to "Databases" → Click "Connect"
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with your database name
   - Example: `mongodb+srv://akarsh:PASSWORD@cluster0.xxxxx.mongodb.net/MernDB?retryWrites=true&w=majority`

5. **Whitelist IPs**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

---

## Part 2: Deploy Backend on Render

1. **Push Latest Code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub account

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository
   - Fill in details:
     - **Name:** `mern-crud-api` (or your choice)
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Root Directory:** `Backend` (Important!)

4. **Set Environment Variables**
   - Go to "Environment" section
   - Add the following variables:
     ```
     PORT=4000
     MONGODB_URI=mongodb+srv://akarsh:PASSWORD@cluster0.xxxxx.mongodb.net/MernDB?retryWrites=true&w=majority
     JWT_SECRET=your_super_secret_jwt_key_12345
     FRONTEND_URL=<your-vercel-frontend-url> (add this after deploying frontend)
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (~2-3 minutes)
   - Copy your backend URL (e.g., `https://mern-crud-api.onrender.com`)

---

## Part 3: Deploy Frontend on Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub account

2. **Deploy Frontend**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `Frontend`

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://mern-crud-api.onrender.com
     ```
     (Use your Render backend URL)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (~2-3 minutes)
   - Get your frontend URL (e.g., `https://mern-project.vercel.app`)

---

## Part 4: Update Backend FRONTEND_URL

1. **Go back to Render**
   - Navigate to your backend service
   - Go to "Environment"
   - Update `FRONTEND_URL` to your Vercel URL:
     ```
     FRONTEND_URL=https://mern-project.vercel.app
     ```

2. **Deploy Changes**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Wait for redeployment

---

## Part 5: Test Your Deployment

1. Open your frontend URL in browser
2. Test all features:
   - Register new account
   - Login
   - Add a book
   - Edit a book
   - Delete a book
   - Logout

---

## Useful Links

- **Render Backend:** https://render.com
- **Vercel Frontend:** https://vercel.com
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

## Troubleshooting

### CORS Errors
- Check `FRONTEND_URL` in Render backend environment variables
- Ensure both URLs are correctly configured

### Database Connection Issues
- Verify MongoDB connection string in Render
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0 or your IP)

### Frontend Can't Connect to Backend
- Check `VITE_API_URL` in Vercel environment variables
- Verify Render backend is running (check logs)
- Clear browser cache and refresh

### Build Failures on Vercel
- Check build logs on Vercel dashboard
- Ensure `vite.config.js` exists in Frontend folder
- Run `npm run build` locally to test

---

## Local Development

To continue local development:

```bash
# Backend (in Backend folder)
npm run dev

# Frontend (in Frontend folder, new terminal)
npm run dev
```

The `npm run dev` script will use nodemon for backend auto-restart.

---

Happy Coding! 🚀
