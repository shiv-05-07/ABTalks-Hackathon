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

### Key Changes
- Landing page redesigned with a minimal black-and-white aesthetic.
- Mobile-first implementation, with 390px as the primary target.
- Simplified navbar with only the required navigation items.
- Added hero, challenge metrics, How It Works, and 60-day journey sections.
- Added responsive behavior for mobile, tablet, and desktop.
- Added lightweight navigation and interaction requirements.
