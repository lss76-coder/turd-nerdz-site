# Setting up real email sending (Resend)

This makes every form on the site actually email info@theturdnerdz.com
automatically — no more depending on a visitor's device having a mail app
configured.

## 1. Create a free Resend account

1. Go to [resend.com](https://resend.com) and sign up (free tier: 3,000
   emails/month, 100/day — plenty for a lead-gen site).
2. Once logged in, go to **API Keys** in the left sidebar.
3. Click **Create API Key**, name it something like "Turd Nerdz website",
   and leave permissions as "Sending access."
4. Copy the key (starts with `re_`) — you only see it once.
5. Give that key to Claude, or add it yourself to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
6. Restart the dev server (`npm run dev`) so it picks up the new variable.

At this point emails will send — but from Resend's shared test address
(`onboarding@resend.dev`), which only delivers to the email address you
signed up to Resend with. For real production use (delivering to
`info@theturdnerdz.com` from your own domain), do step 2 below.

## 2. Verify your domain (recommended before going live)

1. In Resend, go to **Domains** → **Add Domain** → enter `theturdnerdz.com`.
2. Resend gives you a few DNS records (TXT, MX, DKIM CNAME records).
3. Add those records in Spaceship's DNS management panel for your domain
   (Spaceship → your domain → DNS settings → add each record exactly as
   Resend shows it).
4. Back in Resend, click **Verify** — DNS changes can take a few minutes
   to a few hours to propagate.
5. Once verified, add this to `.env.local` (and wherever the site is
   hosted in production):
   ```
   RESEND_FROM_EMAIL=The Turd Nerdz <notifications@theturdnerdz.com>
   ```
6. Restart the dev server again.

## That's it

Once `RESEND_API_KEY` is set, every quote, booking, contact message,
referral, and portal waitlist signup will email info@theturdnerdz.com
directly — the mailto: fallback only kicks in if the API call fails for
some reason, so nothing gets lost either way.
