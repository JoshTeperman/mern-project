# MERN Project

GitHub Repo: https://github.com/JoshTeperman/mern-project

This file should contain,

* A link (URL) to your published App
* A link to your GitHub repository
* Ensure the repo is accessible by your Educators
* Description of your project, including,
* Problem definition / purpose
* Functionality / features
* Screenshots
* Tech stack (e.g. html, css, deployment platform, etc)
* Instructions on how to setup, configure, deploy and use your App.s
* Design documentation including,
* Design process
* User stories
* A workflow diagram of the user journey/s.
* Wireframes
* Database Entity Relationship Diagrams
* Data Flow Diagram
* OO design documentation
* Details of Project Management & Planning process including,
* Project plan & timeline
* Client communications
* Screenshots of Trello board(s)
* Answers to the Short Answer questions (Section 2.2)

# Design Process

## LMS Research & Design

### Considerations

1) For an LMS to be *useful* to an organisation, it has to be *easy to use*. Therefore we should minimise features and prioritise an intuitive UI over bells-and-whistles-type features.
2) It should be obvious how to use the website, where to navigate to, what your options are and what (if any) assigned tasks are upcoming

### Examples of LMS Design

__1) Canvas__
#### What's good about it?
- 'Search for assignment' searchbar
- Assignment Groupings:
  - Upcoming assignments 
  - Undated Assignments
  - Past Assignments
- Modules maximise and minimise view, so you can view all modules or maximise one at a time
- View completed 'ticks' for finished content
- View Status for submitted / completed assignments
- Individualised Cohort / Course name ('Fast Track 2019') with individual branding (CA Logo)
- Breadcrumbs at top of page: 'Fast Track 2019' > Modules 
- Email notifications for graded content

#### What's bad about it?
- Overly Complicated
- No intuitived, central landing page or dashboard that lets you know how you're supposed to navigate the site
- Unclear Section Naming
  - Modules, Assignments, Quizzes ??? 
- Obscure / Pointless Navigation Options
- Hard to find the information you're looking for
- Search only available on 'Assignments' Page
- Ugly, no colour

__2) UDEMY__

#### What's good about it?
- clean, modern design
  - feature-rich
  - elegant tiles
  - colourful
- Landing page when not logged in: call to action is a search bar 'what do you want to learn?' -> encourages users to explore the site
- Landing page after login
  - 'welcome back Josh' greeting
  - 'ready to jump back in?' link to continue recent course, allows you to scrool through current courses
- My Courses View
  - relatively quiet and simple
- Navbar
  - My courses drop-down
  - Notifications tab
- Support page with FAQ
- Individual Course View:
  - Content viewed alongside full course description in same view (can view progress, next lesson etc)
  - checklist / tick boxes for individual lessons / modules
  - Q&A (comments) tab for individual lessons
  - '150 / 300 complete'
  - 'Click to reset progress'

#### What's bad about it?
- Complicated / 'busy' UI on landing page -> includes a lot of recommended courses 'what to study next' type stuff

__3) COURSERA__
https://www.coursera.org/

#### What's good about it?
- Landing Page / Dashboard is very simple
  - My Courses
  - Last Active
  - Completed
  - Accomplishments
- Navbar
  - Simple, has searchbar, logo, profile dropdown
- Course Description Page
  - Nav Bar highlights current section as you scroll (view example: https://www.coursera.org/learn/neural-networks-deep-learning)
  - 'At a glance' section: describes course length (# of hours), number of modules
  - Bulleted course description
  - 'This course is part 1 in the XYZ series"
  - 'Skills you will gain: ...'


#### What's bad about it?
- 



### Features / Functionality

> *"A learning management system (LMS) is a software application for the administration, documentation, tracking, reporting, and delivery of educational courses, training programs, or learning and development programs"* - Wikipedia

#### MVP
- Publish training programs
- Students receive a 'Complete' Badge when each lesson is complete and another when the course is complete
- Content Management system for different media types:
  - Text (Markdown?)
  - Video
  - Images
- User Login (and Registration ??), with multiple user roles:
  - Normal User (marketer, student)
  - Supervisor (Manager)
  - Administrator / MI Academy Staff
- Individualised user dashboards showing course / lesson content
- Personalised views for users. View 'My Courses' which shows individual progress, and view only courses made available to that user
- A 'Next' button or link after login, which is a quick link to the next module / lesson after user's previous session
- Flexible allocation of courses to individual users
- Help Section where students can view information about the course, contact MI Staff 
  - 'Ask your Instructor a question'
  - Report a problem

#### BUCKET LIST
- Stripe / Payments integration - Does she need payment integration?
- Publish modularized training programs that can be broken down into segments.
- Content Management system for different media types:
  - Text (Markdown?)
  - Video
  - Images
  - Pdf / word documents
  - Slides
  - Articles / Links to external content
- Additional analytics view for supervisors and MI Academy employees
- Calendar Integration
- Schedule lessons / seminars and add to calendar
- 'Assessment Mode' where students complete an assessment in a secure way (internet / course materials are unavilable etc) 
- In-app notifications
- Email notifications
- Social Media share buttons for unrestricted course content / assessment results / course completion etc
- Prerequesites (must complete A before B)
- To Do list (could be automated)
- Document uploads for project submissions
- Separate users into teams
- Supervisors (whoever the course manager is) can leave feedback on submitted work


### User Stories
*Persona, What and Why*

__As a marketer / student I can...__

- Login & register an account using my own email address so that my experience is personalised
- View a __dashboard / landing page__ that contains all of my course / training program information so that I can review what I have learned, and what to study next
- Filter / sort courses in dashboard, so that I can view the most relevant. Details include:
  - unfinished courses
  - completed courses
  - course progress (percentage, num modules)
  - course start date / due date / completed date
  - recent courses
- View my Profile page and personalize my profile information so that I can have fun
- View my Account information, which may include payment history and invoices if I have the relevant authorization
- Click on a course tile and view a __course page__, where I can watch videos, read materials, and navigate between modules of the course.

__As a manager / supervisor I can...__
- View an __analytics page__ with overall progress for training programs, including completion statistics, progress, grades
- Print / export data
- Assign / unassign courses to specific students
- Manage / view subscription & payment details

__As an MI employee I can...__
- Publish & manage training programs & courses through the administrator dashboard, so that I can flexibly manage and update course options, prices, and content
- View an overhead view of all ongoing programs and their details so that I can track customer progress
- View reporting & analytics for any program

### VIEWS
- Landing Page for Unauthenticated User
- Landing Page (authenticated) => dashboard
- Login (&& Registration ??) Page
- Course View Page (view individual course, course description, lessons)
- Lesson View Page (Lesson Content)
- User Profile Page (user / account details)
- Support Page / Help Page
- Analytics Page (view status / results for all users: only available to moderator / supervisor users)