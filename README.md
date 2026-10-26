# ICE Media Group website

Static HTML website. No build step. Upload the contents of this folder to the root of your web host or GitHub repository.

## Before going live

1. Add images to `assets/images/` (see IMAGES.md).
2. If your domain is not https://www.icemediagroup.co.uk, find and replace it across all files (canonical tags, sitemap.xml, robots.txt, structured data).
3. Contact forms: every enquiry form posts to Formspree (`https://formspree.io/f/xwllllrz`). Submissions are tracked in the Formspree dashboard.
4. Analytics: add `<script>window.ICE_GA_ID='G-XXXXXXX'</script>` before `main.js` on each page. It loads only after cookie consent.
5. Submit `https://www.icemediagroup.co.uk/sitemap.xml` in Google Search Console.

## GitHub Pages

Push this folder to a repository, then enable Pages (Settings → Pages → Deploy from branch). `404.html` is used automatically. Add a `CNAME` file containing your domain to use a custom domain.

## Structure

- `index.html` home
- `marketing-services.html` + `marketing-services/*.html`
- `ai-training-courses.html` + `ai-training-courses/*.html`
- `about-us.html`, `contact-us.html`
- `privacy-policy.html`, `cookie-policy.html`, `sitemap.html`, `404.html`
- `sitemap.xml`, `robots.txt`
- `assets/css/styles.css`, `assets/js/main.js`

Long-form copy was generated from service-content.js and course-content.js.
