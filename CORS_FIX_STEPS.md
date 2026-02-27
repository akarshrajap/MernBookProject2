# CORS Fix & Deployment Steps

## Status
✅ **Frontend API URL hardcoded** to `https://mern-crud-api.onrender.com`  
✅ **Backend CORS configured** to allow `https://mernbookproject2-2.onrender.com`  
⏳ **Git push pending** — terminal issue, but code is committed locally

## Next Actions (Do These Now)

### Option 1: Manual Git Push (Recommended)
1. Close VS Code completely
2. Open a **fresh PowerShell** or **CMD** window
3. Navigate to the project:
   ```powershell
   cd d:\AKARSH\MernCrudOperations\MernCrudOperations
   ```
4. Check status:
   ```bash
   git status
   ```
5. Push with this command:
   ```bash
   git add .
   git commit -m "hardcode backend URL for CORS fix"
   git push origin main -f
   ```

### Option 2: Redeploy Frontend Without Push
If git is stuck, **manually redeploy on Render/Vercel**:
1. Go to your **Frontend service on Render** (or Vercel project)
2. Click **Manual Deploy** or **Redeploy**
3. Wait for deployment to complete
4. The frontend will use the **locally updated** code (if you deployed from this branch)

---

## What Changed

**Frontend** (`Frontend/src/Api/axios.js`):
```javascript
const API_BASE_URL = 'https://mern-crud-api.onrender.com';
```
(Previously: `import.meta.env.VITE_API_URL || 'http://localhost:4000'`)

**Backend** is configured to accept CORS from:
- `https://mernbookproject2-2.onrender.com` (your deployed frontend)
- `http://localhost:5173` (local development)

---

## Testing After Redeploy

1. Open deployed frontend
2. DevTools → Network tab
3. Try to register/login
4. Confirm request URL shows: `https://mern-crud-api.onrender.com/api/auth/register`
5. Confirm response headers include: `Access-Control-Allow-Origin: https://mernbookproject2-2.onrender.com`

If request succeeds → ✅ **CORS is fixed!**

---

## Next Steps (After Verification)

Once CORS works:
1. Revert frontend to use env var:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mern-crud-api.onrender.com';
   ```
2. Fix the env var on frontend host (Render/Vercel)
3. Redeploy
