# Project TODO

- [x] Analyze emadalddine.com for current content structure, typography, colors, spacing, and responsive behavior
- [x] Preserve the current visual identity while improving hierarchy, polish, and responsive layout
- [x] Build public homepage with hero/profile, about/bio, portfolio/projects, blog/posts, cover images, contact, and social sections
- [x] Add database schema for editable static sections, projects, posts, and cover image metadata
- [x] Add public procedures for published posts, published projects, and editable site sections
- [x] Add owner-only admin authorization using the existing authenticated owner role
- [x] Build admin dashboard using the provided DashboardLayout component
- [x] Add project CRUD with title, description, cover image, and publish/draft toggle
- [x] Add post CRUD with title, summary, body, date, cover image, and publish/draft toggle
- [x] Add static section editor for bio/about and contact/social links
- [x] Add secure image upload flow using S3-backed file storage
- [x] Register public and admin routes with responsive navigation and clear escape routes
- [x] Add Vitest coverage for content authorization and CRUD/public publishing behavior
- [x] Run typecheck, tests, and visual responsive verification
- [x] Create final checkpoint after all TODO items are complete
- [x] Deliver the checkpoint version to the user

## Change history

- [x] New scope: full public personal site plus owner-only admin control panel with live publishing
- [x] New constraint: mirror emadalddine.com content structure, fonts, colors, and overall visual identity
- [x] New requirement: mobile and desktop responsive behavior
- [x] New requirement: image upload support for post/project cover images
- [x] New requirement: published content updates public site immediately
- [x] New requirement: strict owner-only admin access

## Implementation note

The initialized project already includes Manus OAuth, database access, S3 storage helpers, and a reusable DashboardLayout. The admin area will use authenticated owner/admin authorization rather than exposing an unprotected password field in the client.

## Open validation

- [x] Confirm whether the existing site content is expected to be imported verbatim or whether the admin panel should start with editable empty fields where content is unavailable — existing homepage copy and project images were seeded; no articles were invented, so the posts list starts empty
- [x] Confirm exact admin login preference if a separate password is required in addition to Manus owner authentication — implemented as owner authentication plus a separate server-side admin password gate

## Follow-up requirements before final checkpoint

- [x] Add an editable publishedAt date field to posts, its schema, admin form, public rendering, and mutations
- [x] Add Vitest coverage for create/update/delete/toggle flows and public published-only filtering
- [x] Add a separate owner password gate in addition to the existing owner authentication, configured through ADMIN_PANEL_PASSWORD

## Password-session hardening

- [x] Read the admin access cookie from the request Cookie header so it works across real requests and reloads
- [x] Add an integration-style test covering verify password, set cookie, and protected content access

## Password session persistence

- [x] Use a password-derived access token instead of a plain cookie value
- [x] Add a lightweight password-session status procedure and restore the admin UI state after reload
- [x] Add test coverage for token-backed status and reload-style protected access

## Navigation and interaction update

- [x] Make top navigation tabs open dedicated pages for Home, Portfolio, About, Services, Contact, and Admin
- [x] Build a dedicated portfolio page with every project presented in an interactive carousel
- [x] Add dedicated About, Services, and Contact page layouts that reuse the current visual identity and editable content
- [x] Add smooth page transitions and active-tab states
- [x] Add deliberate mouse-wheel/scroll effects with reduced-motion support and mobile-safe behavior
- [x] Add route and carousel interaction tests plus responsive visual verification

## Final interaction hardening

- [x] Back the Services page cards and copy with admin-managed site content, using safe fallback values
- [x] Add executable interaction coverage for route rendering and carousel next/previous/scroll behavior, and ensure it runs in pnpm test

## Final validation gaps

- [x] Bind Services page headings, intro, and process copy to admin-managed site content with fallbacks
- [x] Add jsdom-based rendered interaction tests for route/page output and carousel controls plus wheel behavior

## Router and carousel coverage completion

- [x] Add a jsdom test around the actual public App router that verifies distinct page output and tab navigation
- [x] Extend rendered carousel coverage to include previous/back control behavior as well as next and wheel behavior

## User-requested visual and content update

- [x] Apply Georgia 400 italic to display headings, with white or warm pink accent colors matching the reference
- [x] Make the Arabic language button switch the public site into Arabic RTL mode and back to English
- [x] Show the Control link in the public top navigation consistently, including responsive navigation
- [x] Rebuild the About profile visual using the same circular portrait composition as the Home hero
- [x] Change Portfolio from one slide per project to nested project carousels with explanation, applications, mockups, and project stages
- [x] Prepare Behance project import/source mapping for emadalddine.net/projects while keeping the public UI free of Behance branding — source metadata and selected actual Behance modules are stored locally
- [x] Expand the 4K desktop layout to use more viewport width, reduce excessive side margins, and improve text legibility
- [x] Support right-to-left data presentation when Arabic mode is active
- [x] Add tests for language switching, navigation visibility, nested portfolio carousel behavior, and 4K/RTL layout contracts
- [x] Run typecheck, tests, build, and desktop/mobile/4K visual verification
- [x] Save a new checkpoint for this update
- [x] Deliver the updated checkpoint to the user

## Remaining portfolio import gaps

- [x] Seed/import multiple internal carousel slides for every published portfolio project so none relies on a single fallback slide
- [x] Complete local Behance project-page mapping for every displayed project and verify the public carousel renders without external Behance image dependencies

## Behance fidelity hardening

- [x] Import/store the actual internal page or module content for each displayed Behance project instead of generic local placeholder descriptions
- [x] Add a verification test asserting every published portfolio project has multiple slides and every public slide image uses a local /manus-storage path

## Isti motion & alignment update

- [x] Refine typography hierarchy, heading scale, and left/right alignment across all public pages
- [x] Implement scroll reveal, staggered entrances, and smooth page transitions inspired by Isti without adopting its dark/lime color scheme
- [x] Add a floating WhatsApp icon linked to the site's contact phone number with hover and mobile affordances
- [x] Run typecheck, tests, build, and responsive visual verification
- [x] Save checkpoint and deliver the update
