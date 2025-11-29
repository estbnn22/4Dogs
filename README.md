🐾 4Dogs Grooming — Full-Stack Booking & Admin Platform

A modern grooming appointment system built with Next.js, TypeScript, Prisma, PostgreSQL, and Stack Auth.

🚀 Live Demo

🔗 https://4dogsgrooming.org
 (or your Vercel link — replace this)

📝 Overview

4Dogs is a production-ready grooming appointment booking system featuring:

A complete user flow for booking grooming services

Dynamic pricing based on services and add-ons

Real-time time-slot validation

Automated email confirmations

A powerful admin dashboard to manage appointments

Inventory & product tracking with low-stock warnings

Authentication + RBAC (admin vs customer)

This project was built to solve real scheduling and operational needs for a grooming business.

🧰 Tech Stack
Frontend

Next.js 16 (App Router, Server Components)

React 19

TypeScript

TailwindCSS + DaisyUI

Lucide Icons

Responsiveness (mobile nav + desktop sidebar)

Backend

Prisma ORM v7

Neon PostgreSQL

Server Actions

Zod validation (recommended)

Authentication

Stack Auth (Sessions + RBAC)

Email

Resend (Transactional email)

Appointment confirmations

Admin alerts

Cancellation updates

Deployment

Vercel (frontend + backend)

Neon Serverless PostgreSQL

📦 Features
🐶 Customer Features

Book an appointment with:

Owner name

Dog name, breed, size

Service type + Add-on selection

Notes

Date & Time

Time-slot conflict detection (prevents double booking)

Mobile-friendly booking flow

Automatic email confirmation

View success page after booking

🛠️ Admin Dashboard

View all appointments by:

Date

Status

Customer info

Update appointment status

Cancel appointments

Send status emails automatically

Manage add-ons and services (coming soon)

Inventory management:

Track stock

Low-stock alerts

SKU management

📧 Email Automation

Using Resend:

New appointment email → Admin

Confirmation email → Customer

Cancelled appointment email → Customer

Status update email → Customer

📱 Responsive Design

Mobile nav for small screens

Slide-out sidebar

Clean and modern UI

Works on all devices

🗄️ Database Models

Key Prisma models used:

User (Stack Auth)

Appointment

AddOn

Product (inventory)

ActivityLog

Dog / Owner fields inside Appointment

👤 Author

Esteban Machuca — Full-Stack Developer
📩 estebanmcodes@gmail.com


