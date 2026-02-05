# Render Deployment Guide for WorkBridge

## 🚀 Quick Deploy

### Backend Deployment

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin master
   ```

2. **Create New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository: `Yethu-2/workbridge`
   - Configure:
     - **Name**: `workbridge-backend`
     - **Region**: Singapore (or closest to you)
     - **Branch**: `master`
     - **Root Directory**: `backend`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Add Environment Variables**
   Click "Environment" tab and add:
   ```
   NODE_ENV=production
   PORT=4000
   JWT_SECRET=<generate-a-long-random-string>
   JWT_EXPIRES_IN=7d
   CLIENT_URL=<your-frontend-url>
   SUPABASE_URL=https://sdymxunneetbtbpbuwpy.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL: `https://workbridge-backend.onrender.com`

---

### Frontend Deployment

1. **Update Frontend API URL**
   - Update `frontend/.env` or add environment variable on Render:
   ```
   VITE_API_URL=https://workbridge-backend.onrender.com/api
   ```

2. **Create Static Site on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository: `Yethu-2/workbridge`
   - Configure:
     - **Name**: `workbridge-frontend`
     - **Region**: Singapore (or closest to you)
     - **Branch**: `master`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

3. **Add Environment Variables**
   ```
   VITE_API_URL=https://workbridge-backend.onrender.com/api
   VITE_GEMINI_API_KEY=<your-gemini-key>
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment (2-3 minutes)
   - Your app will be live at: `https://workbridge-frontend.onrender.com`

---

## 🔧 Update Backend CORS

After frontend is deployed, update backend `CLIENT_URL` environment variable:
```
CLIENT_URL=https://workbridge-frontend.onrender.com
```

Then trigger a manual redeploy of the backend.

---

## 📝 Important Notes

### Free Tier Limitations
- Backend spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for one service 24/7)

### Database
- Already using Supabase (hosted separately)
- No additional database setup needed

### Custom Domain (Optional)
- Go to Settings → Custom Domain
- Add your domain and follow DNS instructions

---

## 🐛 Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Check logs: Dashboard → Logs
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set

### Frontend can't connect to backend
- Verify `VITE_API_URL` points to deployed backend
- Check backend CORS allows frontend domain
- Check backend is running (visit `/api/health`)

### Build fails
- Check `package.json` has correct scripts
- Ensure all dependencies are in `dependencies`, not `devDependencies`

---

## ✅ Verification Steps

1. **Backend Health Check**
   ```bash
   curl https://workbridge-backend.onrender.com/api/health
   ```
   Should return: `{"status":"ok",...}`

2. **Test API Endpoints**
   ```bash
   curl https://workbridge-backend.onrender.com/api/jobs
   ```

3. **Frontend Login**
   - Visit your frontend URL
   - Try login/signup
   - Browse jobs

---

## 🔄 Continuous Deployment

Render automatically deploys when you push to `master`:
```bash
git add .
git commit -m "Update feature"
git push origin master
```

Both frontend and backend will redeploy automatically.

---

## 💰 Cost Estimate

- **Backend**: Free (with spin-down)
- **Frontend**: Free
- **Supabase**: Free tier (500MB database, 2GB bandwidth)
- **Total**: $0/month

To upgrade to paid (no spin-down):
- Backend: $7/month (keeps service always running)
