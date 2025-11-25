# 🚀 Quick Setup Guide

## Getting Started

### Step 1: Open Your Portfolio
Simply double-click on `Homepage.html` to open your portfolio in your default browser.

### Step 2: Test All Features
- ✅ Navigate through all sections using the menu
- ✅ Click the chatbot button (bottom right) to test the AI assistant
- ✅ Try hovering over elements to see 3D effects
- ✅ View the Resume page by clicking "View Resume"
- ✅ Test the contact form
- ✅ Check mobile responsiveness by resizing your browser

## 🎯 What's New?

### 1. AI Chatbot (Bottom Right Corner)
- Click the floating blue button to open
- Ask questions about services, pricing, skills, etc.
- Use quick reply buttons for common questions

### 2. Skills Section
- Shows your technical proficiency
- Progress bars animate when you scroll to them
- Hover over skills for 3D effects

### 3. Order Website Section
- Three pricing tiers with detailed features
- Clear pricing information
- Call-to-action buttons

### 4. Modern Resume Page
- Click "View Resume" button on homepage
- Professional layout with all your details
- Download PDF option
- Print-friendly design

## 🎨 Customization Tips

### Change Your Information:

**Homepage.html:**
- Update name, description, social media links
- Add/remove projects
- Modify contact information

**Resume.html:**
- Update work experience
- Add new skills
- Modify achievements

### Change Colors:

**Portfolio.css** (Lines 14-18):
```css
:root {
    --bg-color: #1f242d;      /* Main background */
    --main-color: #0ef;        /* Accent color */
}
```

### Add More Skills:

Copy this block in `Homepage.html` and modify:
```html
<div class="skill-box" data-skill="newskill">
    <div class="skill-icon">
        <i class="fab fa-icon-name"></i>
    </div>
    <h3>Skill Name</h3>
    <div class="skill-progress">
        <div class="progress-bar" data-progress="90"></div>
    </div>
    <span class="skill-percentage">90%</span>
</div>
```

### Modify Chatbot Responses:

In `Portfolio.js`, find the `getBotResponse()` function and add your own responses.

## 📱 Mobile Testing

### Desktop Browser Method:
1. Open Homepage.html
2. Press F12 to open Developer Tools
3. Click the device icon (responsive mode)
4. Select different devices to test

### Or Simply:
Resize your browser window to see responsive design in action!

## 🔧 Troubleshooting

### Chatbot Not Working?
- Make sure JavaScript is enabled
- Check browser console (F12) for errors
- Ensure internet connection (for external libraries)

### Animations Not Showing?
- Refresh the page (F5)
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser

### Custom Cursor Not Visible?
- This feature is disabled on mobile devices (by design)
- Works best on desktop/laptop with mouse

### Particles Not Showing?
- Check your internet connection
- The Particles.js library loads from CDN
- May take a moment to load

## 📊 Performance Tips

### For Best Performance:
1. Use modern browsers (Chrome, Firefox, Edge)
2. Keep browser updated
3. Close unnecessary tabs
4. Ensure stable internet connection

## 🌟 Features Checklist

Test these features:
- [ ] Navigation menu works on all sections
- [ ] Chatbot opens and responds
- [ ] Skills progress bars animate on scroll
- [ ] 3D hover effects work on cards
- [ ] Contact form submits successfully
- [ ] Resume page loads correctly
- [ ] Download PDF button works
- [ ] Social media links open correctly
- [ ] Mobile menu works (on small screens)
- [ ] All images load properly

## 📞 Need Help?

### Common Issues:

**Q: Images not showing?**
A: Check that all images are in the `Images` folder

**Q: Fonts look different?**
A: Font Awesome loads from CDN - check internet connection

**Q: Animations laggy?**
A: Try closing other programs or use a different browser

**Q: Want to upload to a website?**
A: You'll need:
1. A web hosting service
2. Upload all files maintaining folder structure
3. Update any absolute paths to relative paths

## 🎉 You're All Set!

Your portfolio features:
- ✨ 3D animations
- 🤖 AI chatbot
- 💰 Pricing information
- 📊 Skills showcase
- 📄 Professional resume
- 📱 Mobile responsive
- 🎨 Modern design

**Impress your clients and employers!**

---

© 2025 Daniel Minto
