# 👩‍💻 Buse's Interactive Engineering Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Live Site:** [https://buse-portfolio-two.vercel.app/](https://buse-portfolio-two.vercel.app/)

Welcome to the source code of my interactive engineering portfolio! I am a Computer Engineering graduate (Politecnico di Torino) and incoming Master's Candidate (Internet Engineering @ PoliMi). 

I built this platform not just as a standard resume, but as an interactive UI experiment. Instead of standard "Light/Dark" modes, this portfolio features **four completely distinct, shape-shifting UI environments** tailored to different audiences (HR, Software Engineers, Network Architects, and... Italian Bureaucrats).

---

## 🎭 The 4 Interface Modes

This project heavily utilizes `next-themes` and React state to hot-swap entire UI paradigms on the fly:

*   ⚪ **Surface Mode (HR / Recruiter View):** A clean, minimalist, highly scannable UI designed for quick reading. Focuses on high-level summaries and business impact.
*   🟢 **Terminal Mode (Software Engineer View):** A fully functional, custom-built web CLI. You can type `help`, view my skills via `whoami`, and execute scripts like `./drink-automation.sh` to route to project pages.
*   🔵 **Comm_Sys Mode (Network Architect View):** A cyber-style Network Operations Center (NOC) dashboard. Visualizes my projects as network nodes with simulated ping logs, HA routing states, and data pipelines.
*   🎫 **Italiano Mode (Questura A2 Simulator):** A humorous, A2-level Italian mode that parodies Italian bureaucracy. Features a "take a ticket" system, "Error 404" jokes, and explains complex networking concepts (like VLANs) as lines at the post office.

---

## 🚀 Featured Projects

1.  **Drink Int. Enterprise Network Topology:** A highly available L2/L3 enterprise campus network featuring Single-Area OSPF, HSRP Gateway Redundancy, EtherChannel, and strict VLAN segmentation.
2.  **Drink Int. Automation Pipeline:** An automated B2B order processing pipeline using n8n, Make.com, Python, and Gemini LLM APIs to extract unstructured PDF/Email data into strict JSON ERP schemas.
3.  **D.A.R.T. Web Platform:** A responsive, co-led frontend web platform built for digital art research.

---

## 🛠️ Technical Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Library:** [React](https://react.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Theme Management:** `next-themes` (overridden for custom multi-mode support)
*   **Hosting & CI/CD:** [Vercel](https://vercel.com/)

---

## 💻 Run Locally

If you want to clone this repository and run it locally on your machine:

1. Clone the repository:
```bash
   git clone [https://github.com/busepol/buse-portfolio.git](https://github.com/busepol/buse-portfolio.git)
