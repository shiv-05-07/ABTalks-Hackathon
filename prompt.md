# ABTalks Redesign

<details>
<summary>  Prompt 1, click to expand. </summary>Build ONLY the landing/home page shown in the attached reference image.
# Tech stack:
Next.js 14+ with App Router
TypeScript
Tailwind CSS
Lucide React for icons
Responsive, mobile-first implementation
No backend
No authentication
No database
No API calls
Use mock/static data only
IMPORTANT:
The attached image is the visual source of truth. Recreate the page as closely as possible.
Do NOT redesign it, add sections, add pages, or introduce unnecessary UI.
The goal is a highly accurate implementation of this exact landing page.
PAGE:
Route: /
Brand:
Name: ABTalks
Logo mark: {} followed by "ABTalks"
Minimal black-and-white visual identity
Clean, editorial, developer-focused aesthetic
White background
Very subtle gray borders
Almost no decorative colors
Strong black typography
NAVBAR
Create a very clean horizontal navbar at the top.
Left:
{} code-style logo mark
"ABTalks"
Compact and bold
Center:
Only these 3 navigation items:
Home
Dashboard
Day 12
Home should be the active navigation item with a small black underline beneath it.
Right:
Fire/flame icon
"11 Day Streak"
Navbar requirements:
Full width
White background
Thin #eeeeee bottom border
Maximum content width around 1180–1200px
Horizontally centered
Height approximately 56–64px
Minimal spacing
No hamburger menu on desktop
On mobile:
Keep the navbar extremely compact.
Preserve the ABTalks logo.
Navigation should remain usable without making the header tall.
The layout can simplify/reflow, but do not introduce a completely different design.
HERO SECTION
Create a large two-column hero section.
Left side contains:
Small pill/badge:
"⚡ 60-DAY CODING CHALLENGE"
Style:
White/light gray background
Thin border
Rounded pill
Small uppercase typography
Compact
Large headline:
"Build for
60 days."
Use a very large, bold, black sans-serif font.
The line break should be intentional.
Below the headline:
"Build projects. Share your progress.
Grow in public. Get noticed."
Small muted gray text.
Two lines.
Then CTA row:
Primary button:
"Start Day 1 →"
Black background
White text
Slightly rounded corners
Compact
Strong visual weight
Secondary text/link:
"How it works ↓"
No background
Black/gray text
Below CTA, add the small social-proof row:
Four small circular student/avatar images followed by:
"+10K"
Then:
"Join 10,000+ students
building in public"
The avatar images can use simple neutral placeholder portraits or generated circular placeholders.
Do not use colorful stock imagery.
HERO VISUAL
On the right side of the hero, recreate the simple developer illustration from the reference.
It should look like a minimal browser/code window:
White card
Very thin gray border
Rounded corners
Three tiny black/gray browser dots at the top
Large </> code symbol
Several horizontal gray placeholder code lines
Behind it, create a very subtle dotted circular orbit.
In front/right of the browser window create a smaller floating card:
"GitHub Commit" + GitHub icon + check icon
"LinkedIn Post" + LinkedIn icon + check icon
Use thin borders, white background, subtle shadow.
The illustration must remain monochrome.
Do NOT use a large photograph or complex illustration.
It should feel like a simple SaaS/developer-product graphic.
FOUR FEATURE METRICS
Immediately below the hero, create a horizontal four-column feature strip.
The entire strip should be inside a very subtle bordered container with rounded corners.
Four columns:
1.
Calendar icon
"60 Days"
"of consistency"
2.
Code icon
"Build Daily"
"something real"
3.
Share/upload icon
"2 Proofs"
"GitHub + LinkedIn"
4.
Users icon
"Get Noticed"
"by recruiters"
Each column:
centered
icon above text
title bold
subtitle small gray
very subtle vertical dividers between columns
Keep this section compact.
HOW IT WORKS
Below the metrics, create a very light gray / off-white section with rounded corners.
At the top center:
Small uppercase text:
"HOW IT WORKS"
Headline:
"Simple. Daily. Impactful."
Bold but significantly smaller than the hero headline.
Then a horizontal 3-step process:
STEP 1
Circular number:
"1"
Small icon inside/near a rounded square.
Title:
"Pick a Track"
Description:
"Choose what
you want to build"
STEP 2
Circular number:
"2"
Code icon.
Title:
"Build Every Day"
Description:
"Complete a small
project daily"
STEP 3
Circular number:
"3"
Share/upload icon.
Title:
"Share & Grow"
Description:
"Submit 2 proofs and
grow in public"
Connect the three steps with subtle dotted/horizontal connector lines.
Keep everything monochrome and minimal.
60-DAY JOURNEY
At the bottom of the page, create a bordered rounded container.
Header row:
Left:
"YOUR 60-DAY JOURNEY"
Right:
"Day 12 / 60"
Below it:
A horizontal sequence representing 60 days.
The first 12 days should appear completed:
solid black circular dots
The remaining days:
white circles with thin gray borders
Use approximately 60 tiny dots.
Below the journey:
Left:
"Day 1"
Right:
"Day 60"
The current progress should visually correspond to Day 12.
Keep this section compact and clean.
VISUAL STYLE
The entire page should closely match the reference image.
Design principles:
Minimalist
Black and white
Lots of whitespace
Thin #e5e5e5 borders
Subtle gray backgrounds
No gradients
No colorful backgrounds
No excessive shadows
No glassmorphism
No oversized rounded cards
No unnecessary animations
No excessive decoration
Typography:
Use Inter, Geist, or a similarly modern sans-serif font.
Hero heading should be very bold.
Body text should be muted gray.
Use tight letter spacing for large headings.
Small labels can use uppercase typography.
LAYOUT / DIMENSIONS
Desktop:
Maximum content width: approximately 1180–1200px
Center everything horizontally
Hero should occupy roughly 420–480px vertical space
Hero columns approximately 50/50
Consistent 24–32px spacing
Navbar approximately 60px tall
Tablet:
Reduce hero typography and spacing
Maintain two columns where practical
Mobile:
This is IMPORTANT because the final product is mobile-first.
At widths below ~768px:
Stack the hero vertically
Text/content first
Illustration below it
Feature metrics become a 2x2 grid
How-it-works steps become vertically stacked or compact
Journey remains horizontally scrollable if necessary
Prevent horizontal page overflow
Maintain generous but efficient spacing
Buttons should remain easy to tap
Typography should scale down gracefully
Do not simply shrink the desktop layout
INTERACTIONS
Only implement lightweight interactions:
Navbar links should work as links/placeholders.
"Start Day 1" button should navigate to /day/1.
"How it works" can scroll to the How It Works section.
Dashboard can link to /dashboard.
Day 12 can link to /day/12.
No actual dashboard/day page needs to be implemented in this task.
Add subtle hover states:
Buttons slightly change opacity/background
Navigation links get a subtle visual response
Cards should not have exaggerated animations
CODE QUALITY
Use reusable React components such as:
Navbar
Hero
HeroIllustration
FeatureMetrics
HowItWorks
JourneyProgress
Keep the page component clean.
Use semantic HTML:
header
nav
main
section
footer if necessary
Use accessible labels for icons and buttons.
Use CSS/Tailwind rather than hardcoded SVG drawings wherever possible.
For the GitHub/LinkedIn/code/calendar/share/user icons, use Lucide React or simple icon components.
Make sure the application runs immediately with:
npm run dev
Do not require environment variables.
MOST IMPORTANT REQUIREMENT
Do NOT generate anything beyond this landing page.
Do NOT add:
Login/signup
Dashboard content
Challenge content
Pricing
Testimonials
FAQ
Footer links
Blog
Extra navigation items
Dark mode
Additional sections
The reference image is the design specification.
Reproduce its hierarchy, proportions, whitespace, typography, borders, and monochrome aesthetic as accurately as possible while making the implementation responsive and production-quality.
Also the ps:{1
Redesign ABTalks
Reimagine the platform you're standing on.
The Situation
ABTalks runs a 60-day coding challenge for Indian college students.
Students pick a track, build something every day, and maintain a public learning streak by submitting:
A GitHub commit
A LinkedIn post
This daily proof of work helps them build consistency and become visible to recruiters.
Most students use the platform on their phones, late at night after college.
The product works.
It has never been designed.
Ship at Minimum
Design and build the following three screens.
Landing Page (/)
The first experience for a student who has never heard of ABTalks.
Show enough trust, clarity, and motivation that they're willing to commit to a 60-day challenge.
Student Dashboard (/dashboard)
The home screen after logging in.
Include essentials such as:
Current streak
Today's task
Progress through the challenge
Overall completion
Student standing or achievements
3. Challenge Day (/day/12)
The complete experience of a single challenge day.
A student should be able to:
Read the day's task
Understand what needs to be built
Submit proof of work
GitHub repository/commit
LinkedIn post
Submission
Along with your repository and live deployment URL, include a Route Map.
Provide the three routes below, one per line, in this exact order:
/
/dashboard
/day/12
We'll open every submission at 390px width (mobile viewport) and automatically capture screenshots of these routes.
Providing the route map ensures we don't have to guess your URLs.
What We're Looking For
Your redesign should:
Be designed mobile-first (390px), with desktop as a secondary consideration.
Be understandable to a student who has never heard of ABTalks.
Handle real-world edge cases such as:
First day with no streak
A missed day
An empty profile
Introduce at least one thoughtful idea that improves the student experience.
Out of Scope
You do not need to build:
Authentication
Real user accounts
A production database
Use mocked data instead.
A simple JSON file (written by you or generated using AI) is sufficient as long as the interface feels realistic.
Also out of scope:
Recruiter dashboard
Admin panel
Matching ABTalks' current tech stack
Build using any framework or technology your AI workflow is most productive with.} </details>

## Brief

This iteration focuses on the ABTalks landing page (`/`), based on the provided design reference and the original challenge requirements.

The page introduces the 60-day coding challenge, communicates the core value proposition, and establishes the visual language for the rest of the product.

---

# Prompt 2 — Mobile Responsiveness

<details>
<summary>Mobile Responsiveness Prompt</summary>

### Key Changes
- Landing page redesigned with a minimal black-and-white aesthetic.
- Mobile-first implementation, with 390px as the primary target.
- Simplified navbar with only the required navigation items.
- Added hero, challenge metrics, How It Works, and 60-day journey sections.
- Added responsive behavior for mobile, tablet, and desktop.
- Added lightweight navigation and interaction requirements.


Fix the mobile responsiveness of the existing ABTalks landing page.
IMPORTANT:
Do NOT redesign the page.
Do NOT change the desktop design.
Do NOT add new sections or features.
The attached screenshot shows the current broken mobile implementation. Use it to identify and fix the problems.
The page must be genuinely mobile-first and responsive, not simply a scaled-down desktop layout.
==================================================
MOBILE TARGET
Optimize specifically for:
390 px width
The page must never create horizontal overflow.
At any mobile width:
body must not horizontally scroll
no element should extend outside the viewport
text must never overlap
navbar items must never collide
images/illustrations must scale within the viewport
cards must respect the viewport width
==================================================
MOBILE NAVBAR
==================================================
The current navbar is broken because all desktop navigation items are being forced into one row.
Create a proper compact mobile navbar.
Mobile navbar should contain:
LEFT:
{} ABTalks
RIGHT:
Home
Dashboard
Day 12
Streak
But make the spacing responsive so these elements never overlap.
The navbar should:
remain approximately 56–64px tall
have horizontal padding around 16–20px
use smaller typography on mobile
allow navigation items to shrink appropriately
never push content outside the viewport
If all four navigation items cannot comfortably fit at very narrow widths, use a clean mobile navigation treatment rather than allowing overlap.
Do NOT allow:
text wrapping inside navigation items
navbar content being cut off
streak badge covering other navigation items
horizontal scrolling
The screenshot currently shows:
"ABTalksHome"
and
"Day 12"
colliding.
This must be completely fixed.
==================================================
2. HERO MOBILE LAYOUT
On mobile, the hero MUST become a single-column layout.
Order:
Challenge badge
Main heading
Description
CTA buttons
Social proof
Developer illustration
Do not attempt to keep the desktop two-column layout.
The hero text should use the full available width with comfortable horizontal padding.
Use approximately:
padding-left: 18–20px
padding-right: 18–20px
The heading:
Build for
60 days.
must remain on two lines.
Use responsive typography such as:
text-[48px] on small mobile
or an equivalent clamp() value.
Do not make the heading so large that it causes overflow.
The heading should have:
tight line height
strong font weight
no horizontal overflow
==================================================
3. HERO DESCRIPTION
The description should wrap naturally:
Build projects. Share your progress.
Grow in public. Get noticed.
Do not force desktop line widths.
Maximum width should be appropriate for mobile.
Use muted gray typography and approximately 15–16px font size.
==================================================
4. CTA BUTTONS
The CTA row should work properly on mobile.
Primary:
Start Day 1 →
Secondary:
How it works ↓
Keep them on the same row when there is enough room.
However, at very narrow widths, allow them to wrap or stack cleanly.
Never let:
buttons overflow
text overlap
buttons become smaller than usable touch targets
Primary button should remain approximately 48–52px tall.
==================================================
5. SOCIAL PROOF
The current social-proof section is too wide and poorly positioned.
Create a compact responsive row:
[avatars] [+10K] Join 10,000+ students
building in public
On mobile:
avatars should remain visible
reduce avatar size slightly if necessary
text should wrap naturally
keep the entire component inside the viewport
Do NOT let the social-proof section become wider than the screen.
==================================================
6. HERO ILLUSTRATION
This is especially important.
The desktop illustration currently extends beyond the mobile viewport.
On mobile:
move the illustration BELOW the social proof
center it
make it responsive
width: approximately 90–100% of available content width
max-width should prevent it from becoming oversized
preserve its proportions
The browser/code illustration should NOT be cropped horizontally.
The orbit/dotted circle should also scale with the illustration.
The floating GitHub/LinkedIn card should remain inside the illustration bounds.
If necessary, reduce the illustration's internal scale on mobile.
Do NOT hide the illustration completely unless absolutely necessary.
==================================================
7. MOBILE SPACING
The current page has excessive vertical gaps in some places and cramped elements in others.
Use a consistent mobile spacing system.
Approximately:
Navbar
↓
28–32px
↓
Challenge badge
↓
20–24px
↓
Heading
↓
18–24px
↓
Description
↓
28–32px
↓
CTA
↓
40–48px
↓
Social proof
↓
40–56px
↓
Illustration
Do not blindly use these exact values.
Adjust visually based on the reference.
The page should feel intentional and balanced.
==================================================
8. DESKTOP MUST NOT BREAK
IMPORTANT:
The desktop version is already close to the intended design.
Do NOT modify the desktop layout unnecessarily.
Use responsive Tailwind breakpoints such as:
mobile:
default
tablet:
md:
desktop:
lg:
The desktop two-column hero should remain.
The mobile layout should only activate below the appropriate breakpoint.
==================================================
9. RESPONSIVE CONTAINER
Use a proper responsive container.
Example concept:
w-full
max-w-[1200px]
mx-auto
px-5
sm:px-6
lg:px-8
Do not use fixed widths that cause mobile overflow.
Avoid fixed pixel widths for:
hero
illustration
cards
navigation
feature sections
Use:
width: 100%
max-width
min-width: 0
flex-wrap where appropriate
responsive grid/flex layouts
==================================================
10. OVERFLOW DEBUGGING
Inspect the entire page for sources of horizontal overflow.
Check:
navbar
hero
heading
CTA row
avatars
illustration
floating cards
orbit decoration
feature metrics
How It Works section
journey dots
No child element should accidentally create viewport overflow.
Do NOT solve the problem simply by adding:
overflow-x-hidden
to the body.
That can hide the underlying layout bug.
Fix the actual sizing/layout problems first.
You may use overflow-hidden on individual decorative illustration containers where appropriate.
==================================================
11. MOBILE FEATURES SECTION
The four feature metrics should NOT remain as four tiny columns on mobile.
Change them to a 2 × 2 grid:
┌─────────────┬─────────────┐
│ 60 Days │ Build Daily │
│ consistency │ something...│
├─────────────┼─────────────┤
│ 2 Proofs │ Get Noticed │
│ GitHub... │ recruiters │
└─────────────┴─────────────┘
Keep the same visual style.
==================================================
12. HOW IT WORKS ON MOBILE
The 3 steps should become a vertical layout:
1 Pick a Track
Choose what you want to build
2 Build Every Day
Complete a small project daily
3 Share & Grow
Submit 2 proofs and grow in public
Keep the same minimal visual language.
The connector should become vertical or be removed if it interferes with the layout.
==================================================
13. 60-DAY JOURNEY ON MOBILE
The 60-day journey must remain usable.
Do NOT allow 60 dots to force the entire page wider than the viewport.
Put the journey inside a horizontally scrollable internal container if necessary.
Important:
Only the journey itself may scroll horizontally.
The entire page must NOT scroll horizontally.
Keep:
Day 1 Day 60
and:
Day 12 / 60
visually clear.
==================================================
14. FINAL RESPONSIVE TEST
After making the changes, test the page at:
320 × 800
360 × 800
375 × 812
390 × 844
414 × 896
768 × 1024
1024 × 768
1440 × 900
At every size verify:
✓ No horizontal page overflow
✓ Navbar does not overlap
✓ Hero heading does not overflow
✓ Buttons remain usable
✓ Social proof fits
✓ Illustration fits inside viewport
✓ Feature grid works
✓ How It Works works
✓ Journey works
✓ Desktop design remains intact
==================================================
FINAL REQUIREMENT
The attached screenshot represents the CURRENT BROKEN MOBILE RESULT.
Do not copy its layout.
Use it to identify what is wrong.
The desired result is the SAME ABTalks design and visual identity, but properly adapted for mobile.
Think of mobile as a deliberately designed responsive composition, not a compressed desktop page.
Make the changes directly in the existing Next.js/Tailwind implementation.
Do not create a separate mockup.
Do not add unnecessary functionality.

## Brief

This iteration focuses on fixing and refining the landing page for mobile devices without changing the existing desktop design.

### Key Changes
- Converted the hero into a proper single-column mobile layout.
- Fixed mobile spacing, typography, CTA behavior, and social-proof positioning.
- Made the developer illustration responsive and prevented horizontal clipping.
- Changed the feature metrics into a 2 × 2 mobile grid.
- Changed the How It Works section into a vertical mobile layout.
- Made the 60-day journey independently horizontally scrollable when necessary.
- Added responsive container and overflow requirements.
- Added testing requirements across common mobile, tablet, and desktop viewport sizes.
- Preserved the existing desktop design and visual identity.