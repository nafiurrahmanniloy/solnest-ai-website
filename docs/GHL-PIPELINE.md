# Solnest AI — GoHighLevel Operations Reference

> **Internal team reference.** Last updated 2026-05-10. Maintained by Niloy. Audience: Christine (VA), Dee, Ryan, Niloy.
>
> If anything in this doc is wrong, it's because the underlying state changed. Update this doc the same day.

---

## At a glance

| Slug | Value |
|---|---|
| GHL Account (Location) | Solnest AI |
| Location ID env | `GHL_LOCATION_ID` (set in Vercel) |
| Company ID | `PTtM4nIlGHCHpe0agt7j` |
| Account admin | Ryan Lefebvre — `hello@solnestai.com` |
| VA | Christine — handles unread conversations + lead triage |
| Time zone | America/Los_Angeles |
| Default sender | `Ryan | Solnest AI <hello@solnestai.com>` |

---

## Booking architecture (2026-05-08 simplification)

Two flows. Skool members get free quick chat on Google. Everyone else pays $229 on the website for the full hour.

```
┌─────────────────────────────┬─────────────────────────────┐
│  Skool community members    │  Public + paid Skool        │
│  (Dee owns, off-website)    │  (We own, on-website)       │
├─────────────────────────────┼─────────────────────────────┤
│  Tool: Google Appointment   │  Tool: GHL calendar widget  │
│         Scheduler           │         (Build Session)     │
│  Cost: FREE                 │  Cost: $229 / 60 min        │
│  Length: 15 min             │  Length: 60 min             │
│  Where: Skool community     │  Where: solnestai.com/apply │
│  URL: calendar.app.google/  │         + share link        │
│       orfVgzex8G2UJ69Z8     │  Pay: Stripe checkout       │
│  Slots: Dee curates in GCal │  Slots: synced from Ryan's  │
│                             │         Google Calendar     │
└─────────────────────────────┴─────────────────────────────┘
```

The Discovery Call flow (free 30-min, intake-form gated, budget-tier routing) was retired. Don't reintroduce it.

---

## Calendars

Three calendars exist. Only one is actively bookable.

| Name | ID | Status | Duration | Notes |
|---|---|---|---|---|
| Solnest — Build Session (Paid) | `cAO2AcF1CiCA1SaLHGa9` | **Active** | 60 min | $229 flat. Round-robin → Ryan only. Currently no availability hours opened (Dee's task). Meeting location: `custom` (no auto Google Meet — flip in UI). |
| Solnest AI — Discovery Call | `loVZXEb7zp7rwNKoaC3y` | Archived | 30 min | Paused 2026-05-08. Description prefixed `[ARCHIVED]`. Has Google Meet conferencing. Don't delete (per no-deletion rule). |
| Test | `qWDAoZeaaIK5ViSjsH4O` | Inactive | 30 min | Junk leftover from earlier setup. Ignore. |

### Build Session calendar — what's still pending

- ❌ **Open availability hours** — `openHours: {}` is empty. Until Dee sets bookable windows, the website widget shows no slots.
- ❌ **Flip meeting location** to Google Meet (currently `custom`). Without this, GHL invites go out without a conferencing link.
- ❌ **Verify Google Calendar 2-way sync** at user level (Settings → My Profile → Calendar Connections, check Ryan's `hello@solnestai.com`). When verified, blocked time on Ryan's Google Calendar = unbookable on the website.
- ✅ Existing in-app notifications: Ryan gets alerted when bookings come in (auto-created at calendar setup).

---

## Pipelines

Five pipelines exist in the location. Snapshot from a recent `get_pipeline_summary`:

| Pipeline | ID | Stages | Approx. opps |
|---|---|---|---|
| FREE MASTERCLASS | `jExnLJfT30rEOuOI7LV5` | REGISTERED 1, REGISTERED PART 2, REGISTERED 3, ATTENDED, NO SHOW | ~340 |
| Solnest Class Pipeline | `zQGeI8SQTBZlwFGpkpMu` | Registered Free, Attended Free, No Show Free, Offered Paid Workshop, Paid Workshop, Attended Paid, No Show Paid, Repeat Customer | ~90 |
| IG DM Funnels | `y88EnSYbEpIFb79qLY5Z` | New DM, Engaged, Hot Lead, Joined Community, Cold | small |
| Skool FREE community | `uKiGAjCIzW1RQPG9Hxrs` | New lead, Nurturing, Converted to Paid | empty |
| PAID WEBINAR | `H1l1KLxLTr3W7rquL9vz` | REGISTERED, ATTENDED, NO SHOW | empty |

**Convention:** new web leads land in either FREE MASTERCLASS (legacy registrations) or get tagged + dropped into the relevant pipeline manually by Christine. The Build Session paid flow does NOT auto-create an opportunity yet — that's a future improvement.

---

## Workflows

Ten workflows live in the location. Seven are KEEP, three are RETIRED. All currently have **0 triggers** because of GHL's documented Firestore bug — triggers cannot be added via API; Dee adds them in the UI.

### KEEP — needs trigger added in UI

| ID | Workflow | What it does | Trigger Dee should add |
|---|---|---|---|
| `f2e699e4-...` | Apply Form Acknowledgment | 1-min wait → email "Got your application" | Contact Tag Added: `source-apply-form` |
| `19b4f6a9-...` | New Lead Internal Notification | Tags `new-lead-pending-review` → in-app notify Christine with name/email/phone/reason | Contact Tag Added: `source-apply-form` (parallel to above) |
| `43ffee20-...` | Build Session Reminder | 24h-before email "Build Session prep" → 1h-before email "in 1 hour" | Appointment Booked → Build Session calendar |
| `e424d556-...` | Build Session No-Show Recovery | 30-min wait → email "your $229 is safe" → 3-day wait → final email | Appointment Status: No-Show → Build Session calendar |
| `5ed93329-...` | Post Build Session | 4h email "Recording + bigger picture" → 3d email "Putting it into the system?" → 5d email "Final close" | Appointment Status: Showed → Build Session calendar |
| `a0c40fc5-...` | IG Lead Nurture | 30-min email Skool link → 3d value drop → 7d final → tag `ig-cold-lead` | Contact Tag Added: TBD (whichever IG-source tag we standardize on) |
| `76f8a860-...` | Skool Free → Paid Nurture | 2d welcome → 5d "what a member built" → 7d "$67/mo locked" → 14d final reminder | Contact Tag Added: TBD (whichever Skool-free-tier tag we use) |

### RETIRED — Discovery flow is gone, recommend deleting these in UI

| ID | Workflow | Why retired |
|---|---|---|
| `02109392-...` | Discovery Call Reminder | Discovery Call calendar archived |
| `22223ff5-...` | Discovery Call No-Show Recovery | same |
| `ef35ed81-...` | Post Discovery Call | same |

### Recent fixes (2026-05-08)

- **`e424d556` (No-Show Recovery)** — both email subjects updated `$350` → `$229` (was stale). Done via API.
- **`19b4f6a9` (New Lead Internal Notification)** — body cleaned: removed dead merge tags `{{contact.application_budget}}`, `{{contact.application_timeline}}`, `{{contact.application_route}}` (custom fields no longer populated since /apply was simplified). Body now shows name/email/phone/reason only. Done via API.

---

## Tags convention

Tags are how the website talks to GHL workflows. Use exactly these spellings — workflows trigger off them.

| Tag | Set when | Set by |
|---|---|---|
| `source-apply-form` | User submits the website intake at `/apply` | `/api/apply` |
| `paid-build-session` | User completes Stripe + appointment is created | `/api/booking/create` |
| `stripe-{first14chars}` | Same — provides Stripe session reference for reconciliation | `/api/booking/create` |
| `new-lead-pending-review` | First action of New Lead Internal Notification workflow (auto) | Workflow `19b4f6a9` |
| `ig-cold-lead` | Last action of IG Lead Nurture workflow (auto) | Workflow `a0c40fc5` |

**Don't use** previously-planned tags: `route-discovery`, `route-build-session`, `budget-*`, `timeline-*`, `booked-discovery-call`. The /apply form no longer routes by budget tier.

---

## Custom fields (contact)

The /apply form currently writes two custom fields on each contact:

| Internal label | Field ID | What's stored |
|---|---|---|
| Reason / What they want help with (reusing the legacy "project" field ID) | `H1IlPBPAsEZinVaiYmFK` | Free-text intake reason |
| Submitted at | `rRuYgzXLv1PZf7GZfZD7` | ISO timestamp |

Other custom fields exist in the location but are not actively populated by the website anymore. Christine: feel free to use them for manual tagging.

---

## Website integration

Codebase: `github.com/nafiurrahmanniloy/solnest-ai-website` (Next.js, hosted on Vercel main branch).

| Route | What it does | Talks to |
|---|---|---|
| `/apply` | Single-step intake form (name / email / phone / reason). Submits to `/api/apply`, then routes user to `/build-session`. | `/api/apply` |
| `/api/apply` | Upserts GHL contact, attaches reason as a note, applies tag `source-apply-form`. | GHL Contacts API + Notes API |
| `/build-session` | $229 paid offer page. "Pay" button hits Stripe checkout API. | `/api/build-session/checkout` |
| `/api/build-session/checkout` | Creates Stripe checkout session. Success URL → `/book?type=build&session_id=...`. | Stripe API |
| `/book` | Calendar widget (Build Session). Lists Ryan's free slots, takes booking. | `/api/booking/slots` + `/api/booking/create` |
| `/api/booking/slots` | Pulls free slots from GHL calendar. | GHL Calendars API (`/free-slots`) |
| `/api/booking/create` | Creates GHL contact (if new) + appointment + applies `paid-build-session` + `stripe-*` tags. | GHL Contacts + Appointments APIs |

### Vercel env vars (current)

| Variable | What | Owner | Status |
|---|---|---|---|
| `GHL_API_KEY` | Private Integrations API key for the Solnest location | Ryan | ✅ set |
| `GHL_LOCATION_ID` | Solnest location ID | Ryan | ✅ set |
| `GHL_BUILD_SESSION_CALENDAR_ID` | `cAO2AcF1CiCA1SaLHGa9` | Ryan | ✅ set |
| `GHL_CALENDAR_ID` | Legacy fallback (Discovery). Can be removed since Discovery archived. | Ryan | optional |
| `STRIPE_SECRET_KEY` | Stripe live secret key | Ryan | ⏸️ **PENDING** |
| `STRIPE_PRICE_BUILD_SESSION` | Stripe price ID for the $229 product | Ryan | ⏸️ **PENDING** |

Until the two Stripe envs are set, `/build-session` shows "Payment system not configured yet" and the flow can't go live.

---

## MCP server

Custom hardened fork: **`gohighlevel-mcp-pro`** — `github.com/nafiurrahmanniloy/gohighlevel-mcp-pro`.

566 tools / 44 categories. Lean mode default loads 181 tools. Used for all GHL automation work: workflow editing, calendar management, contact ops, audits.

Key power tools we actually use:
- `ghl_audit_workflows` — finds broken workflows (run before any audit)
- `ghl_update_workflow_actions` — edit workflow actions/email subjects/notification bodies
- `consolidate_tags` — fix tag fragmentation
- `find_all_duplicates` — group duplicate contacts
- `get_pipeline_summary` — sales dashboard in one call
- `bulk_toggle_workflows` — enable/disable many workflows at once
- `get_deliverability_health` — score email/SMS health vs GHL throttle thresholds

Do not introduce a different MCP fork for this account — keep everything routed through `gohighlevel-mcp-pro`.

---

## Stripe

Single product, single price. No Skool discount on the website (Skool members go to the free Google flow instead).

| Item | Status |
|---|---|
| Product: Build Session — 60-min consultation with Ryan, $229 one-time | Pending Ryan to create in Stripe Dashboard |
| Price ID env: `STRIPE_PRICE_BUILD_SESSION` | Pending Ryan to paste into Vercel |
| Stripe Checkout success URL | Configured in `/api/build-session/checkout` to redirect to `/book?type=build` |
| Stripe webhooks | Not yet configured — currently we trust the success-URL redirect to drive booking creation |

---

## Pending checklist

In rough priority order. Without these, the public booking flow is not live.

| # | Owner | Action |
|---|---|---|
| 1 | Ryan | Create Stripe product ($229, one-time, 60-min Build Session). Paste price ID into Vercel env `STRIPE_PRICE_BUILD_SESSION`. |
| 2 | Ryan | Verify Google Calendar 2-way sync at user level (Settings → My Profile → Calendar Connections). |
| 3 | Dee | Open availability hours on Build Session calendar (in GHL UI → Calendar → Availability). |
| 4 | Dee | Flip Build Session calendar meeting location from `custom` to Google Meet (Calendar → Meeting Details). |
| 5 | Dee | Add the 5 unambiguous workflow triggers (per the table in this doc). |
| 6 | Dee | Confirm + add triggers for IG Lead Nurture and Skool Free → Paid Nurture (waiting on tag conventions). |
| 7 | Dee | Delete (or just leave as `draft`) the 3 RETIRED Discovery workflows. |
| 8 | Dee | Paste the Skool Google Appointment Scheduler URL inside the Skool community: `https://calendar.app.google/orfVgzex8G2UJ69Z8` |

---

## Known limitations / unfixable

- **Workflow trigger creation via API** returns `5 NOT_FOUND: No document to update: triggers/{uuid}`. GHL's UI uses Firestore SDK directly, bypassing the REST endpoint. **All workflow triggers must be added in the GHL UI.** This is documented in the `gohighlevel-mcp-pro` repo's `PATCHES.md`.
- **Contact merge has no API.** GHL's "Manage and Merge Duplicates" tool is UI-only. We use `find_all_duplicates` to discover dupes, then merge in UI. Top-voted unfulfilled GHL ideas-portal feature.
- **Webhook signature verification rotates to Ed25519 in July 2026.** RSA scheme deprecates. Our MCP's `verify_webhook_signature` already supports both schemes — when GHL flips, we won't break.
- **Google Appointment Scheduler doesn't support paid bookings natively.** That's why the website uses GHL (Stripe + booking on one screen) instead of Dee's Google flow.

---

## Quick reference: who does what

| Task type | Who | Where |
|---|---|---|
| GHL workflow triggers + UI edits | Dee | GHL UI |
| Email template HTML edits | Dee | GHL → Email Templates |
| Calendar availability hours | Dee | GHL → Calendar settings |
| Stripe products + Vercel envs | Ryan | Stripe + Vercel dashboards |
| Google Calendar connection | Ryan | GHL → My Profile |
| Conversation triage / unread inbox | Christine | GHL → Conversations |
| Manual contact tagging / pipeline moves | Christine | GHL → Contacts |
| Code changes (website + APIs) | Niloy | `solnest-ai-website` repo |
| MCP server + automation tooling | Niloy | `gohighlevel-mcp-pro` repo |
| Workflow audits + bulk operations | Niloy via MCP | `gohighlevel-mcp-pro` |

---

## Change log

- **2026-05-10** — This doc created. Audience: internal team.
- **2026-05-08** — Booking funnel simplified. Discovery Call retired. /apply rewritten as single intake. /build-session is single $229 (no Skool toggle). Build Session calendar description updated. No-Show Recovery emails fixed ($350→$229). New Lead Internal Notification body cleaned of dead merge tags.
- **2026-05-07** — `gohighlevel-mcp-pro` published. Lean-mode MCP server with 14 composite tools.
- **2026-05-04** — Original two-tier funnel built (Discovery + Build Session). Custom fields, /apply, /build-session, /book all created. 10 workflow drafts authored.
