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
</details>
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

---

# Prompt 3 — Student Dashboard

<details>
<summary>Student Dashboard Prompt</summary>

Build the ABTalks Student Dashboard page shown in the attached reference image.

Tech stack:
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Lucide React icons
- Responsive and mobile-first
- Static/mock data only
- No backend
- No authentication
- No database
- No API calls

IMPORTANT:
The attached reference image is the visual source of truth.

Recreate THIS dashboard only.
Do not redesign it into a generic SaaS dashboard.
Do not add additional pages or sections.
Do not add a sidebar.
Do not add charts that aren't shown in the reference.

The dashboard should feel like the same ABTalks product as the landing page:
minimal, monochrome, developer-focused, clean, compact, and editorial.

==================================================
PAGE
==================================================

Route:

/dashboard

The existing ABTalks navbar should be reused.

Navbar:

LEFT:
- `{}` logo
- ABTalks

CENTER:
- Home
- Dashboard
- Day 12

Dashboard is the active item with a small black underline.

RIGHT:
- flame icon
- "11 Day Streak"

Keep the navbar visually consistent with the landing page.

==================================================
OVERALL VISUAL STYLE
==================================================

Use the reference image extremely closely.

Style:
- white background
- black typography
- very light gray borders
- subtle off-white surfaces
- minimal shadows
- no gradients
- no colorful UI
- no glassmorphism
- no oversized cards
- no excessive rounded corners

Typography:
- Geist / Inter / similar modern sans-serif
- strong bold headings
- compact labels
- muted gray secondary text

The dashboard should feel dense but NOT cluttered.

Main content max-width:
approximately 1180–1200px

Center the dashboard content horizontally.

Desktop page should have approximately 24–32px horizontal padding.

==================================================
1. GREETING
==================================================

At the top of the dashboard content:

"Good evening, Arjun. 👋"

Bold, approximately 15–16px.

Below:

"Let's keep the streak alive."

Small muted gray text.

Keep this section compact.

==================================================
2. FOUR STAT CARDS
==================================================

Below the greeting, create four equal-width cards in one horizontal row on desktop.

Card 1:

Icon:
flame

Value:
"11"

Label:
"Day Streak"

Supporting text:
"You're on a roll! 🔥"

Card 2:

Circular progress indicator:
20%

Value:
"20%"

Label:
"Journey Progress"

Supporting text:
"12 / 60 days"

Card 3:

Code icon:
`</>`

Value:
"12"

Label:
"Projects Built"

Supporting text:
"Keep shipping!"

Card 4:

Bar/chart icon

Value:
"Top 18%"

Label:
"Your Standing"

Supporting text:
"Among all builders"

Card design:
- white background
- thin #e8e8e8 border
- subtle 8–10px radius
- approximately 68–72px tall
- icon inside a subtle circular/light background
- value should be bold
- supporting text small gray

Do not make these cards excessively tall.

On mobile:
- transform into a 2 × 2 grid
- maintain readable spacing
- do not shrink the content excessively

==================================================
3. MAIN CONTENT GRID
==================================================

Below the stat cards, create the main dashboard content as a two-column grid.

Desktop:

LEFT COLUMN:
Today's Challenge
This Week

RIGHT COLUMN:
Overall Progress
Achievements

Approximate proportions:
left = 1.05
right = 1

Both columns should align vertically.

Do NOT create a sidebar.

==================================================
4. TODAY'S CHALLENGE
==================================================

Create a bordered card.

Header:

Small uppercase label:
"TODAY'S CHALLENGE"

Main challenge:

Large document/file icon inside a black rounded square.

Title:
"Build a recruiter-friendly README"

Description:
"A good README tells your story before you do."

Second description:
"Make your project easy to understand and impressive."

Keep the text compact.

Add a small metadata row:

clock icon
"45 min"

Then buttons:

Primary:
"Start Today's Challenge   →"

Secondary:
"View Details"

The primary button is black with white text.

The secondary button:
- white background
- thin gray border
- black text

Desktop:
buttons appear horizontally.

Mobile:
buttons should stack or become full-width depending on available space.

==================================================
5. OVERALL PROGRESS
==================================================

Create a bordered card.

Header:
"TODAY'S PROGRESS"

Actually use:

"OVERALL PROGRESS"

Below:

"12 / 60 Days"

Large bold text.

"20% Completed"

Small muted text.

Then create a horizontal progress bar:
- light gray track
- black progress
- approximately 20% filled

Below the progress bar, show four compact progress rows:

GitHub Proofs
12 / 12
check-circle icon

LinkedIn Proofs
10 / 12
empty circle

Days Completed
12 / 60
empty circle

Current Streak
11 Days
empty circle

Each row:
- icon on left
- label
- value aligned right
- small status icon on far right

Keep the rows compact.

==================================================
6. THIS WEEK
==================================================

Below Today's Challenge, create the weekly activity card.

Header:

"THIS WEEK"

Then seven columns:

Mon
Tue
Wed
Thu
Fri
Sat
Sun

Under each day, show a circular status indicator.

Monday:
filled black circle + check

Tuesday:
filled black circle + check

Wednesday:
filled black circle + check

Thursday:
filled black circle + check

Friday:
empty circle
Current day

Saturday:
dotted/empty circle

Sunday:
dotted/empty circle

Below each:

Day 8
Day 9
Day 10
Day 11
Day 12
Day 13
Day 14

At the bottom:

"2 days left this week. You've got this! 💪"

Keep it subtle and compact.

The current day (Day 12) should be visually identifiable without introducing colors.

==================================================
7. ACHIEVEMENTS
==================================================

Create a bordered card.

Header:

"ACHIEVEMENTS"

Right side:
"View all →"

Then three achievement rows.

Achievement 1:

Flame icon

"7 Day Streak"
"Complete 7 days in a row"

Right:
check indicator

Achievement 2:

GitHub/code icon

"First Commit"
"Make your first GitHub commit"

Right:
check indicator

Achievement 3:

Badge/award icon

"Public Builder"
"Share 10 updates on LinkedIn"

Right:
"10 / 10"

Use subtle icon containers.

Do not make achievements colorful.

==================================================
8. BOTTOM REMINDER BAR
==================================================

At the bottom of the dashboard content, create a full-width bordered card.

Left:
calendar icon in a light circular/square container.

Text:

"Don't break the chain!"

Below:
"Submit your proofs today and keep the streak alive."

Right:
black button:

"Submit Proofs   →"

On mobile:
- card content can stack
- button should become full-width
- maintain comfortable spacing

==================================================
9. RESPONSIVE DESIGN
==================================================

This dashboard MUST be mobile-first.

Do NOT simply shrink the desktop dashboard.

Desktop:
- navbar horizontal
- four stat cards in one row
- main content two columns
- bottom reminder full width

Tablet:
- reduce spacing
- cards may remain 2×2
- main content may remain two columns if there is enough width

Mobile:

Navbar:
Keep it compact and prevent any overlap.

Greeting:
Full width.

Stats:
2 × 2 grid.

Main content:
ONE COLUMN.

Order on mobile:

1. Today's Challenge
2. Overall Progress
3. This Week
4. Achievements
5. Bottom Reminder

Every card should use:
width: 100%
max-width: 100%
min-width: 0

No horizontal overflow.

==================================================
10. MOBILE NAVBAR
==================================================

The previous landing page implementation had a mobile navbar problem where:

"ABTalksHome"

and:

"Day 12"

were colliding.

Do NOT repeat that mistake.

At widths:
320px
360px
375px
390px
414px

the navbar must remain completely usable.

Do not allow:
- navigation text overlap
- streak badge overlap
- text wrapping inside navigation items
- horizontal page overflow

If necessary, reduce navbar typography/spacing at very narrow widths.

The navbar should remain visually consistent with the landing page.

==================================================
11. RESPONSIVE CARD BEHAVIOR
==================================================

Do not use fixed desktop widths.

Avoid things like:

width: 500px

for cards.

Use responsive grid/flex layouts.

For example:

Desktop:
grid-template-columns: repeat(4, 1fr)

Mobile:
grid-template-columns: repeat(2, 1fr)

Main dashboard:

Desktop:
grid-template-columns: 1fr 1fr

Mobile:
grid-template-columns: 1fr

All cards should shrink naturally.

==================================================
12. ICONS
==================================================

Use Lucide React.

Recommended icons:

Flame
Code2
BarChart3
FileText
Clock3
CheckCircle2
Circle
CalendarDays
ArrowRight
Trophy
Github
Linkedin
Users
TrendingUp

Keep icon stroke widths consistent.

Do not use random emoji as primary UI icons.

The flame emoji may remain in small supporting text where shown in the reference.

==================================================
13. DATA
==================================================

Use static mock data:

User:
Arjun

Day:
12

Total Days:
60

Streak:
11

Journey Progress:
20%

Projects:
12

Standing:
Top 18%

GitHub Proofs:
12 / 12

LinkedIn Proofs:
10 / 12

Days Completed:
12 / 60

Current Streak:
11 Days

Challenge:
Build a recruiter-friendly README

Duration:
45 min

Achievements:
7 Day Streak
First Commit
Public Builder

==================================================
14. COMPONENT STRUCTURE
==================================================

Create reusable components:

DashboardPage
Navbar
Greeting
StatsGrid
StatCard
TodaysChallenge
OverallProgress
WeeklyProgress
Achievements
AchievementItem
ReminderBar

Keep components clean and maintainable.

Use semantic HTML.

==================================================
15. DESKTOP VISUAL ACCURACY
==================================================

Match the reference image closely in:

- card dimensions
- spacing
- border thickness
- typography hierarchy
- alignment
- icon placement
- progress indicators
- button dimensions
- whitespace

The dashboard should occupy approximately the same visual density as the reference.

Do not make everything huge.

This is a compact productivity dashboard.

==================================================
16. FINAL QUALITY CHECK
==================================================

Test at:

320 × 800
360 × 800
375 × 812
390 × 844
414 × 896
768 × 1024
1024 × 768
1440 × 900

Verify:

✓ No horizontal page scrolling
✓ No navbar overlap
✓ No card overflow
✓ No text clipping
✓ No broken grid
✓ Buttons remain tappable
✓ Stats become 2×2 on mobile
✓ Main content becomes one column
✓ Weekly progress remains readable
✓ Achievement rows remain readable
✓ Reminder button works visually
✓ Desktop remains close to reference
✓ Mobile looks intentionally designed

MOST IMPORTANT:

This is the ABTalks Dashboard.

Keep the same visual language as the ABTalks landing page.

Do not add:
- sidebar
- dark mode
- analytics charts
- settings
- profile page
- notifications
- extra dashboard widgets
- pricing
- footer
- unrelated content

Only implement the dashboard shown in the reference image.

</details>

## Brief

This iteration adds the ABTalks Student Dashboard at `/dashboard`, while keeping the same visual language established by the landing page.

### Key Changes
- Added the Student Dashboard page at `/dashboard`.
- Reused the existing ABTalks navbar and visual identity.
- Added greeting and student progress information.
- Added four responsive stat cards for streak, journey progress, projects, and standing.
- Added Today's Challenge and Overall Progress sections.
- Added weekly activity tracking.
- Added achievements and the bottom reminder/proof submission section.
- Added mobile-first responsive behavior with a 2 × 2 stats grid and single-column content layout.
- Added responsive navbar requirements to prevent the previous mobile overlap issue.
- Added reusable dashboard components and static mock data.
- Preserved the monochrome, minimal, compact ABTalks design.
- Added responsive testing requirements across mobile, tablet, and desktop sizes.

### Route

`/dashboard`


---

# Prompt 4 — Challenge Day

<details>
<summary>Challenge Day Prompt</summary>

Build the ABTalks Challenge Day page shown in the attached reference image.

Tech stack:
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Lucide React icons
- Responsive and mobile-first
- Static/mock data only
- No backend
- No authentication
- No database
- No API calls

IMPORTANT:
The attached image is the exact visual reference for this page.

Recreate this page closely.
Do not redesign it into a generic form page.
Do not add extra features, sections, navigation items, or unrelated content.

This is the ABTalks Day Challenge page.

Route:
`/day/12`

==================================================
1. GLOBAL DESIGN LANGUAGE
==================================================

Keep the exact same visual language as the ABTalks landing page and dashboard:

- Minimal
- Black and white
- White background
- Very light gray borders
- Subtle gray surfaces
- Thin borders
- Small rounded corners
- Minimal shadows
- No gradients
- No colorful UI
- No glassmorphism
- No excessive rounded cards

Typography:
- Geist / Inter / modern sans-serif
- Strong black headings
- Compact UI labels
- Muted gray secondary text

Main content max-width:
approximately 1180–1200px

Center the content horizontally.

Reuse the existing ABTalks Navbar.

==================================================
2. NAVBAR
==================================================

Use the same navbar as the landing page and dashboard.

LEFT:
`{}` ABTalks

CENTER:
- Home
- Dashboard
- Day 12

Day 12 is the active navigation item.

RIGHT:
- Flame icon
- "11 Day Streak"

Navbar:
- white
- approximately 56–64px high
- thin bottom border
- centered content
- minimal spacing

Do not introduce a sidebar.

IMPORTANT MOBILE REQUIREMENT:

The navbar must NOT overflow.

At:

320px
360px
375px
390px
414px

make sure:
- no items overlap
- no text gets clipped
- no horizontal page scroll
- streak indicator remains usable
- navigation remains readable

==================================================
3. PAGE LAYOUT
==================================================

Desktop layout:

Two main columns.

LEFT:
Challenge information/sidebar

RIGHT:
Challenge submission workflow

Approximate ratio:

left: 30–32%
right: 68–70%

There should be a comfortable gap between the columns.

On mobile:
Convert the entire page into ONE COLUMN.

Order:

1. Back to Dashboard
2. Day number
3. Challenge title
4. Duration
5. Challenge description
6. Why this matters
7. Deliverables
8. Skill signal
9. Submit GitHub Proof
10. Submit LinkedIn Proof
11. Review & Submit
12. Can't complete today?

Do NOT keep the desktop two-column layout on mobile.

==================================================
4. LEFT CHALLENGE INFORMATION
==================================================

At the top:

"← Back to Dashboard"

Small muted navigation link.

Make it clickable:

`/dashboard`

Then:

"DAY 12 / 60"

Small uppercase/bold label.

Main title:

"Build a recruiter-
friendly README"

Keep the intentional line break on desktop.

On mobile it may become:

"Build a recruiter-friendly README"

or naturally wrap based on viewport width.

Do not allow text overflow.

Use a large, bold heading.

Then a small duration pill:

clock icon
"45 min"

White/light gray background
thin border
small rounded corners

==================================================
5. CHALLENGE DESCRIPTION
==================================================

Below the duration:

"A good README tells your story before you do."

Then:

"Make your project easy to understand and impressive."

Use small muted gray text.

Keep the width constrained so the text doesn't become too wide.

==================================================
6. WHY THIS MATTERS
==================================================

Create a small bordered card.

Header:

lightbulb icon

"Why this matters"

Body:

"Your README is often the first thing recruiters see.

A clear README shows communication, clarity and
attention to detail."

Use compact text.

Card should feel like an informational callout, NOT a giant card.

==================================================
7. DELIVERABLES
==================================================

Create a bordered card:

"Deliverables"

Description:

"Your README must include:"

Then checklist:

✓ Project overview

✓ Tech stack

✓ Installation / Setup

✓ Screenshots (if any)

✓ Key learnings

Use small check-circle icons.

Keep the list compact.

==================================================
8. SKILL SIGNAL
==================================================

At the bottom of the left column:

Star icon

"Skill signal"

Below:

"Communication • Documentation • Git"

Use a subtle gray background.

==================================================
9. SUBMISSION WORKFLOW
==================================================

The right side contains THREE major workflow cards.

They must appear sequentially.

==================================================
10. STEP 1 — GITHUB
==================================================

Card header:

Number circle:
"1"

Title:
"Submit GitHub Proof"

Description:

"Push your code to GitHub and submit the commit link."

Then:

"Repository Link"

Input field:

GitHub icon

`https://github.com/arjunmehta/portfolio`

External-link icon on right

Then:

"Commit Link (or latest commit)"

Input field:

GitHub icon

`https://github.com/arjunmehta/portfolio/commit/abc1234def`

External-link icon on right

Below inputs:

Black button:

"◉ Verify GitHub"

On the right side of the card, desktop only, create a verification status card:

check-circle icon

"Verified"

"GitHub proof looks good!"

The verification card should be compact.

On mobile:
Place the verification status BELOW the GitHub fields rather than beside them.

==================================================
11. STEP 2 — LINKEDIN
==================================================

Second card.

Number:
"2"

Title:
"Submit LinkedIn Proof"

Description:

"Share your progress on LinkedIn and submit the post link."

Label:

"LinkedIn Post Link"

Input:

LinkedIn icon

`https://www.linkedin.com/posts/arjunmehta_built-readme-day12`

External-link icon on right

Below:

Black button:

"◉ Verify LinkedIn"

Right side desktop:

verification card:

check-circle icon

"Verified"

"LinkedIn proof looks good!"

On mobile:
Move verification card underneath the form.

==================================================
12. STEP 3 — REVIEW & SUBMIT
==================================================

Third card.

Number:
"3"

Title:
"Review & Submit"

Description:

"Make sure everything looks good before you submit."

Then create a horizontal review summary.

Three compact cards/sections:

GitHub

GitHub icon

`arjunmehta/portfolio`

`abc1234def`

Divider

LinkedIn

LinkedIn icon

"LinkedIn Post"

"Posted"
"just now"

Divider

Streak

Flame icon

"11 Day Streak"

"You're on fire! Keep it up."

Then a full-width black button:

"Submit Today's Proof   →"

This button should be prominent.

==================================================
13. MOBILE REVIEW SECTION
==================================================

This section is important.

The desktop review summary is horizontal.

On mobile:
Do NOT squeeze three sections into tiny columns.

Instead use either:

Option A:

GitHub
--------
repo
commit

LinkedIn
--------
Posted
just now

Streak
--------
11 Day Streak
You're on fire!

OR use a compact 1-column/stacked layout.

Everything must remain readable.

The submit button should be:

width: 100%

height: approximately 48–52px

==================================================
14. CAN'T COMPLETE TODAY
==================================================

At the bottom:

Small info icon.

"Can't complete today?"

Below:

"You can mark it as skipped and continue tomorrow.
Your streak will be at risk."

Right side:

"Skip Day  →"

Make this a subtle bottom action area.

Do not make it visually stronger than the submit button.

On mobile:
Stack the content if necessary.

==================================================
15. INPUT DESIGN
==================================================

Inputs should closely resemble the reference.

Use:

- white background
- thin #dedede border
- approximately 6–8px radius
- height around 34–38px desktop
- approximately 44–48px mobile
- GitHub/LinkedIn icon on left
- external-link icon on right

Placeholder/value text:
small and gray/black.

Inputs must never overflow their cards.

Use:

width: 100%
min-width: 0

Do not use fixed widths.

==================================================
16. BUTTON DESIGN
==================================================

Primary buttons:

Black background
White text
Small radius
Compact height

Examples:

"Verify GitHub"
"Verify LinkedIn"
"Submit Today's Proof →"

Secondary:
white background
thin gray border
black text

Buttons should have subtle hover states only.

No exaggerated animations.

==================================================
17. RESPONSIVE DESIGN
==================================================

This page MUST be mobile-first.

Desktop:
Two-column layout.

Tablet:
Two-column layout if enough space, otherwise transition to one column.

Mobile:
ONE COLUMN.

Recommended breakpoint:

Desktop:
lg:grid-cols-[0.42fr_1fr]

Mobile:
grid-cols-1

Do not use fixed desktop widths.

==================================================
18. MOBILE SPACING
==================================================

Use approximately:

Page horizontal padding:
16–20px

Back link:
20px below navbar

Day label:
20–28px below back link

Heading:
8–12px below day label

Description:
16–20px below heading

Information cards:
16px gaps

Workflow cards:
16px gaps

Do not create huge empty vertical spaces.

The page should remain compact and easy to scan.

==================================================
19. MOBILE TYPOGRAPHY
==================================================

Challenge heading:

Desktop:
approximately 32–38px

Mobile:
approximately 30–34px

Use tight line height.

Step headings:
14–16px

Descriptions:
12–14px

Labels:
10–12px

Buttons:
12–14px

Do not let any heading cause horizontal overflow.

==================================================
20. RESPONSIVE WORKFLOW CARDS
==================================================

Desktop workflow cards should have:

Header + description

Form fields

Verification card positioned to the right where shown

Mobile workflow cards should become:

Header
Description
Input
Input
Verify button
Verification status

Everything stacked vertically.

The card width must always be:

width: 100%

Never allow content to escape the card.

==================================================
21. DATA
==================================================

Use these exact mock values:

User:
Arjun Mehta

Current day:
12

Total days:
60

Streak:
11

Challenge:
Build a recruiter-friendly README

Duration:
45 min

Repository:
https://github.com/arjunmehta/portfolio

Commit:
https://github.com/arjunmehta/portfolio/commit/abc1234def

LinkedIn:
https://www.linkedin.com/posts/arjunmehta_built-readme-day12

GitHub:
Verified

LinkedIn:
Verified

==================================================
22. COMPONENT STRUCTURE
==================================================

Create reusable components:

ChallengeDayPage
Navbar
ChallengeSidebar
ChallengeIntro
InfoCard
DeliverablesCard
SkillSignal
SubmissionWorkflow
GithubSubmission
LinkedinSubmission
ReviewSubmission
VerificationStatus
ProofInput
SkipDay

Keep the components clean.

Avoid putting the entire page into one massive component.

==================================================
23. ACCESSIBILITY
==================================================

Use semantic HTML.

Inputs must have labels.

Buttons must be real buttons.

Links must be real links.

Icons should have accessible labels where appropriate.

Do not rely on icons alone to communicate important actions.

==================================================
24. MOBILE TESTING
==================================================

Test specifically at:

320 × 800
360 × 800
375 × 812
390 × 844
414 × 896

Also test:

768 × 1024
1024 × 768
1440 × 900

At every mobile width verify:

✓ No horizontal scrolling
✓ Navbar does not overlap
✓ Challenge title does not overflow
✓ Left information cards fit
✓ Inputs fit their cards
✓ Verification cards stack correctly
✓ Review cards stack correctly
✓ Buttons are full-width where appropriate
✓ Skip Day section fits
✓ No text is clipped
✓ No fixed-width desktop elements remain

==================================================
MOST IMPORTANT
==================================================

The attached reference image is the visual specification.

Reproduce its:

- hierarchy
- proportions
- spacing
- typography
- borders
- button styles
- card structure
- workflow
- monochrome appearance

Do not add:
- sidebar
- comments
- chat
- analytics
- extra challenges
- calendar
- leaderboard
- profile
- notifications
- footer
- dark mode
- additional navigation

Only build the ABTalks Day 12 Challenge page shown in the reference.

The mobile version should be a carefully adapted single-column version of this exact design, NOT a squeezed desktop layout.

</details>

## Brief

This iteration adds the ABTalks Challenge Day experience at `/day/12`, completing the three required product screens.

### Key Changes
- Added the Challenge Day page at `/day/12`.
- Reused the existing ABTalks navbar and established visual language.
- Added the Day 12 challenge information and challenge description.
- Added the "Why this matters", Deliverables, and Skill Signal sections.
- Added the three-step submission workflow:
  - GitHub proof
  - LinkedIn proof
  - Review & Submit
- Added verification states for GitHub and LinkedIn submissions.
- Added a final review summary for GitHub, LinkedIn, and the current streak.
- Added the "Can't complete today?" skip-day action.
- Added mobile-first single-column behavior for the entire challenge workflow.
- Made form inputs, verification cards, review sections, and buttons responsive.
- Added static mock data for the student and submission links.
- Added accessibility and responsive testing requirements.
- Preserved the same minimal, monochrome ABTalks design across all three screens.

### Route

`/day/12`
# Prompt 5 — AI Student Report Card, Real-Time GitHub Verification & SPA Routing Fixes

<details>
<summary>Prompt 5, click to expand.</summary>

### Overview
This update introduces the **AI-Powered Student Report Card** feature, **Real-Time GitHub Repository Verification**, and **SPA Direct Path Routing Fixes** while preserving the core ABTalks monochrome aesthetic, mobile responsiveness (390px viewport), and existing product screens.

---

### 1. SPA Routing Architecture
- **Framework**: React 18+ with Vite and TypeScript using client-side `window.history.pushState` routing in `src/App.tsx`.
- **Supported Routes**:
  - `/` (Landing Page)
  - `/dashboard` (Student Dashboard)
  - `/day/12` (Challenge Day & Submission Workflow)
  - `/report-card` (AI Student Report Card)
- **Direct Navigation Fix**:
  - `vercel.json`: Added rewrite rule (`"source": "/(.*)", "destination": "/index.html"`) to prevent 404 errors during direct browser refreshes on subpaths.
  - `vite.config.ts`: Configured `appType: 'spa'` for local development server fallback.
  - `src/App.tsx`: Synchronized initial state to preserve exact path (`window.location.pathname || '/'`) with `popstate` event listeners for browser back/forward history navigation.

---

### 2. GitHub Proof Submission Workflow
- **Location**: `src/components/SubmissionWorkflow.tsx` and `src/components/StudentReportCard.tsx`.
- **Behavior**:
  - Students enter GitHub Repository URL (`https://github.com/owner/repo`), optional Commit Link, pasted code snippet, and pasted LinkedIn post caption.
  - Submission and Verification are decoupled:
    - **Submitted**: Saves repository and LinkedIn link inputs locally.
    - **Pending / Unverified**: Displays submission links with a clear "Verify GitHub" trigger button.
    - **Verified**: Triggering verification checks repository authenticity and updates UI state to "Verified" with a check badge.
    - **Verification Error**: Displays inline error banner if repository URL is invalid or private, allowing instant editing and retry without resetting form inputs.

---

### 3. GitHub Repository Verification Mechanics
- **Component / Service**: `src/services/aiReportService.ts` (`verifyGitHubRepo`).
- **Mechanism**:
  - Uses public GitHub REST API (`https://api.github.com/repos/{owner}/{repo}`) without requiring user authentication keys.
  - Verifies public existence of the repository (`200 OK` vs `404 Not Found`).
  - Fetches real-time latest commit details (`https://api.github.com/repos/{owner}/{repo}/commits?per_page=1`):
    - Commit SHA Hash (short 7-character string)
    - Latest Commit Message
    - Author Name & Commit Timestamp
  - **Error Handling**: Throws clear validation errors for non-existent or private repositories.

---

### 4. AI Student Report Card Engine
- **Location**: `src/components/StudentReportCard.tsx`, `ReportCardForm.tsx`, `ReportCardDisplay.tsx`.
- **AI Integration**:
  - Integrates Google Gemini API (`gemini-1.5-flash` via `@google/genai` or direct API endpoint) to evaluate student proof of work.
  - Generates real-time code quality analysis and recruiter pitch feedback based on pasted code snippets and LinkedIn captions (solving LinkedIn's non-public API constraint).
  - Features smart heuristic fallback evaluation when no API key is present or when offline.

---

### 5. Report Card Content Structure
The generated report card contains:
- **Overall Score**: Composite rating out of 100 with Performance Band classification ("High Distinction", "Verified Builder").
- **Code Quality Score (0–100)**: Evaluates code structure, logic, and edge-case handling.
- **LinkedIn Pitch Score (0–100)**: Evaluates technical storytelling, clarity, and recruiter appeal.
- **Verified GitHub Banner**: Displays verified full repository name, commit message, and commit SHA hash.
- **AI Code Review**: Executive summary of code elegance, demonstrated technical strengths, and improvement suggestions.
- **LinkedIn Recruiter Feedback**: Actionable recommendations for increasing LinkedIn visibility and engagement.
- **Time Efficiency Note**: Analysis of time spent vs. execution speed.

---

### 6. GitHub Repository Analysis Scope
The analysis engine reads and processes:
- Full GitHub Repository Name & Owner
- Verified Latest Commit Message and Commit SHA
- Pasted JavaScript/TypeScript Source Code Snippet
- Pasted LinkedIn Post Text Caption
- Completion Duration (Minutes) and Timestamp

---

### 7. Preservation of Existing Base Application
All previous features and UI layouts remain 100% intact:
- Landing Page (`/`) with Hero, Feature Metrics, How It Works, and 60-Day Journey.
- Student Dashboard (`/dashboard`) with Stat Cards, Today's Challenge, Overall Progress, and Weekly Tracker.
- Challenge Day (`/day/12`) with Deliverables, GitHub/LinkedIn inputs, and Skip Day options.
- Compact monochrome visual system (`#000000`, `#FFFFFF`, `#DEDEDE`).

---

### 8. Responsive Behavior (Mobile 390px Target)
- **Mobile (390px)**: Single-column stacked layout, full-width touch targets (48px–52px height buttons), horizontally bounded cards with zero viewport overflow.
- **Desktop (1180px)**: 2-column layout for forms, reviews, and analytics cards.

---

### 9. File Directory & Component Map
- `src/services/aiReportService.ts`: GitHub REST API verification (`verifyGitHubRepo`) and Gemini AI evaluation service (`analyzeDailySubmission`).
- `src/components/StudentReportCard.tsx`: Main AI Report Card component handling submission form, loading states, error handling, and verified output rendering.
- `src/components/ReportCardForm.tsx`: Input form component for student details, subjects, and proof inputs.
- `src/components/ReportCardDisplay.tsx`: Presentation card matching the ABTalks dark/monochrome visual system.
- `src/components/Navbar.tsx`: Header component with `/report-card` nav link integrated into `RoutePath` system.
- `src/App.tsx`: Application container and client-side router managing view switching for all 4 routes.
- `src/types.ts`: TypeScript interfaces for `SubmissionProofInput`, `AIProofAnalysisResult`, `StudentProfile`, and `RoutePath`.
- `vercel.json`: SPA rewrite configuration file for deployment.
- `vite.config.ts`: Vite build configuration with `appType: 'spa'` fallback.

</details>

## Brief

This iteration adds the AI Student Report Card feature, real-time public GitHub repository verification, and direct SPA routing fixes while preserving the base application.

### Key Changes
- Added AI-powered Student Report Card at `/report-card`.
- Integrated real-time GitHub REST API verification for checking public repository existence, latest commit message, and commit SHA hash.
- Implemented Google Gemini AI integration (`gemini-1.5-flash`) for evaluating code quality and LinkedIn recruiter pitch captions.
- Solved LinkedIn non-public API restriction by allowing students to paste LinkedIn post captions directly for AI analysis.
- Resolved direct URL 404 navigation errors by adding `vercel.json` rewrites and updating `App.tsx` initial state handling.
- Maintained mobile-first responsiveness (390px target) and monochrome visual identity across all screens.

### Route Map

```text
/
/dashboard
/day/12
/report-card
```