export interface Lesson {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  type: 'text' | 'code' | 'exercise';
  content: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases?: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  image?: string;
  lessons: Lesson[];
  estimatedTime: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Git & GitHub',
    slug: 'git-github',
    description: 'Learn version control with Git and collaborate using GitHub. Master repositories, commits, branches, and pull requests.',
    difficulty: 'beginner',
    category: 'Version Control',
    estimatedTime: '4h',
    lessons: [
      {
        id: '1-1',
        title: '01. Introduction',
        description: 'Gitting Started',
        sections: [
          {
            id: '1-1-1',
            title: 'Gitting Started',
            type: 'text',
            content: `Welcome to the Git and GitHub course!

In 2005, a Finnish software engineer named Linus Torvalds ran into a problem while building the Linux operating system. With so many versions of the code, managing everything became a nightmare. So he created Git, a version control system that tracks changes to a project's code.

A few years later, the web platform GitHub launched, founded by Tom Preston-Werner, Chris Wanstrath, and PJ Hyett in San Francisco. Often called the "Google Drive for code," it quickly became the standard way for developers to store, share, and collaborate on code online, with 150 million users.

In this chapter, we'll learn the basic Git commands, take some code from our computer, and upload it to GitHub into something called a repository!

No matter where you are in your coding journey, we recommend posting every project – from that first "Hello World" to a portfolio piece – because every line of code tells a story to the world.

Let's Git started.`
          },
          {
            id: '1-1-2',
            title: 'Check Git Installation',
            type: 'text',
            content: `First thing first, quickly check if Git is pre-installed on your computer.

Find and open the Terminal on Mac or Command Prompt on Windows:`
          },
          {
            id: '1-1-3',
            title: 'Verify Git Version',
            type: 'code',
            content: 'git --version'
          },
          {
            id: '1-1-4',
            title: 'Installation Guide',
            type: 'text',
            content: `If Git is installed, you should see a version number like git version 2.39.3 appear. Good to go!

Note: If you don't have Git installed, don't worry! Download it on your computer following these steps:

For Mac:
1. Visit the Git for macOS page (https://git-scm.com/downloads/mac)
2. Click the Binary installer link, and Git should begin downloading
3. After downloading, open the file and follow the installation instructions
4. Run the git --version command again after installation to verify

For Windows:
1. Visit the Git for Windows page (https://gitforwindows.org/)
2. Click the "Download" button
3. Follow the installation instructions and accept any default settings
4. After installing, open the Git Bash application or Command Prompt to verify with git --version`
          }
        ]
      },
      {
        id: '1-2',
        title: '02. Repositories',
        description: 'GitHub Repos',
        sections: [
          {
            id: '1-2-1',
            title: 'GitHub Repos',
            type: 'text',
            content: `Hold on, so what's the difference between Git and GitHub again?

Git is the tool that allows software engineers to track changes, while GitHub is the website that hosts Git repositories. Simply put, GitHub was built on top of Git, so we cannot use GitHub without Git.

Code is stored in repositories or repos on GitHub, which are like folders for your files and assets (e.g. images, videos, audios, fonts).

This is what a GitHub profile looks like - each account has dozens of public repositories.`
          },
          {
            id: '1-2-2',
            title: 'Creating Your Repository',
            type: 'text',
            content: `We'll start your version control journey by creating your first GitHub repository!

First, sign up for a GitHub account if you don't have one already at https://github.com

Look for the "New" button anywhere on your GitHub dashboard or profile.`
          },
          {
            id: '1-2-3',
            title: 'Repository Setup',
            type: 'text',
            content: `Once you've clicked "New", you'll be directed to the Create a new repository page.

Here, name your repo with anything you'd like (i.e., first-repo)! For now, we'll keep the repo public and not include a README file.

Click "Create Repository" and you'll see a page that includes next-step instructions!`
          },
          {
            id: '1-2-4',
            title: 'Repository URL Format',
            type: 'text',
            content: `Great! You've created a repository on GitHub!

The link of your repo will follow this format: https://github.com/[username]/[repo-name].git

Where:
- [username] is your GitHub username
- [repo-name] is the repository name

For example: https://github.com/s8rr/first-repo.git

The new repo is empty right now! Let's see how we can change that in the next exercise.`
          }
        ]
      },
      {
        id: '1-3',
        title: '03. Git Commands',
        description: 'Remote & Local',
        sections: [
          {
            id: '1-3-1',
            title: 'Remote & Local Repositories',
            type: 'text',
            content: `The GitHub repo we created is empty and sad right now, so let's work on adding some files. Think of something that you can share online, it could be some code (like a .html, .css, .js, .py, .cpp, .java file) from one of our courses, a personal project, or a homework assignment.

To get our code online, we have to work with two types of repos that connect with one another:

- ☁️ Remote repository: a GitHub repo stored somewhere on the internet (for the latest version)
- 🏡 Local repository: a Git repo that lives on your own computer (for drafts)

We have the empty remote repo on GitHub, so now we need a local repo. Let's go over some basic Git terminal commands to create a local repo and connect it to the remote repo.`
          },
          {
            id: '1-3-2',
            title: 'Git Init',
            type: 'text',
            content: `The git init command initializes a new Git repo (local repo). It's the first command you run when you have a new project and want to start tracking changes. The history of your project starts here!`
          },
          {
            id: '1-3-3',
            title: 'Initialize Repository',
            type: 'code',
            content: 'git init'
          },
          {
            id: '1-3-4',
            title: 'Understanding Git Init',
            type: 'text',
            content: `When you run this command, Git will create a new directory named .git in your project folder. This directory contains all the information about your project's history and configuration.

The terminal will return something like:
Initialized empty Git repository in /Users/username/Desktop/python/.git

Think of this like turning a normal computer folder into a Git-tracked project.`
          },
          {
            id: '1-3-5',
            title: 'Git Remote',
            type: 'text',
            content: `Local repo? Check. Remote repo? Check. Now, we can connect our local repo with our remote repo.

The git remote command manages connections to remote repos. We can add a connection by:`
          },
          {
            id: '1-3-6',
            title: 'Connect Remote',
            type: 'code',
            content: 'git remote add origin <repository_url>'
          },
          {
            id: '1-3-7',
            title: 'Understanding Git Remote',
            type: 'text',
            content: `The command breakdown:
- add: Add a new remote connection
- origin: Give a nickname for the remote repo's URL (origin is a common one)
- <repository_url>: Placeholder for the remote repo's URL

Example:
git remote add origin https://github.com/codedex-io/first-repo.git

Here we're telling Git: "Yo, connect my local repo to the first-repo remote repo, and I'll call the URL origin."

Now, we have our local and remote repos connected!`
          },
          {
            id: '1-3-8',
            title: 'Git Branch',
            type: 'text',
            content: `Let's now rename the branch to main. This will be the branch we push code to, and will be default branch.`
          },
          {
            id: '1-3-9',
            title: 'Rename Branch',
            type: 'code',
            content: 'git branch -M main'
          },
          {
            id: '1-3-10',
            title: 'Understanding Git Branch',
            type: 'text',
            content: `The uppercase -M flag means "move" (or "rename"). We'll discuss what branches are later in the chapter.

To verify everything is set up correctly, you can run:
git branch

If you see main in the output, you're all set!`
          }
        ]
      },
      {
        id: '1-4',
        title: '04. Git Workflow',
        description: 'Working Directory & Staging',
        sections: [
          {
            id: '1-4-1',
            title: 'Working Directory & Staging',
            type: 'text',
            content: `Now that we've connected our local & remote repos, let's turning the project folder into the local repo.

The two main Git commands that we will use are git add and git commit.

But first, we have to make a distinction between the working directory and the staging area:

- 💻 Working directory is the project folder on your computer! When you make changes to the files, Git tracks them, and you can move selected changes to the staging area using the git add command.
- 📋 Staging area is where we prep changes, like "I'm almost ready! One more min!" It's a temporary area where you choose what files you want to "commit" to the local repo with git commit.`
          },
          {
            id: '1-4-2',
            title: 'Git Add',
            type: 'text',
            content: `The git add command tells Git which changes you want to include in the next commit. Think of it like packing your suitcase before a trip – it's choosing what to bring.

Here are three variations:

1️⃣ Add one file:
git add example.txt

🔡 Add all files:
git add .

*️⃣ Add files with specific extension:
git add *.html`
          },
          {
            id: '1-4-3',
            title: 'Stage Changes',
            type: 'code',
            content: 'git add .'
          },
          {
            id: '1-4-4',
            title: 'Git Commit',
            type: 'text',
            content: `Committing files are about saving a "snapshot" of the current code. Each commit captures a moment in time and includes a helpful message to explain what changed. This helps you track your progress and separate different actions in your code.

Now that we are ready to commit your staged files, use the following command:`
          },
          {
            id: '1-4-5',
            title: 'Create Commit',
            type: 'code',
            content: "git commit -m 'Your commit message here!'"
          },
          {
            id: '1-4-6',
            title: 'Understanding Commits',
            type: 'text',
            content: `The lowercase -m flag means "message".

Here's what some commit messages might look like for a typical project:
- 'Initial commit'
- 'Add pics to homepage'
- 'Fixed again fr this time!!'

Note: Commit messages get silly when you're working on your own for a while, but short, clear, and descriptive messages are needed when working on a team! We want messages to help you (and your team) understand what changed and why.

If the commit is successful, you should see a message appear in the terminal like:
[main 09f4acd] Updated index.html with a new line
 1 file changed, 1 insertion(+)`
          }
        ]
      },
      {
        id: '1-5',
        title: '05. Local Push',
        description: 'Finally...',
        sections: [
          {
            id: '1-5-1',
            title: 'Git Status',
            type: 'text',
            content: `We are almost done! It's time to move our code from the local repo to the remote repo on GitHub.

But before we push our code to GitHub, we need to make sure we have the correct files committed!

The git status command is used to check the status of your files. It is a handy command that will show you which files are staged, unstaged, and untracked.

- Staged files are ready to be committed
- Unstaged files are not yet ready to be committed
- Untracked files are new files that Git has not seen before

Simply run the following command to check the status of your files:`
          },
          {
            id: '1-5-2',
            title: 'Check Status',
            type: 'code',
            content: 'git status'
          },
          {
            id: '1-5-3',
            title: 'Understanding Status',
            type: 'text',
            content: `In short, you are saying, "Hey Git, what's the situation right now?"

An example response would be:
On branch main
No commits yet
Untracked files:
  .DS_Store
  test.py
  output.gif

Use git status anytime you're confused about the state of your repo.`
          },
          {
            id: '1-5-4',
            title: 'Git Push',
            type: 'text',
            content: `Let's now use the command we'll use to finally "push" or publish our code! This is the last step.

The git push command is used to send your locally committed changes to your remote repository. You'll see all the changes you've made on GitHub.

First time pushing to a branch, the command usually looks like:
git push -u origin main

The -u flag stands for "upstream". This links your local branch to the remote branch so that future push commands will automatically apply to this branch without needing to specify it each time.

Once that's set, any commits you push to this branch will just require:
git push

When that's done, you'll be able to refresh your GitHub repository URL, and see your changes online!`
          },
          {
            id: '1-5-5',
            title: 'Push to Remote',
            type: 'code',
            content: 'git push -u origin main'
          }
        ]
      },
      {
        id: '1-6',
        title: '06. Congratulations!',
        description: 'You did it!',
        sections: [
          {
            id: '1-6-1',
            title: 'Recap',
            type: 'text',
            content: `Congratulations on reaching the end of the first chapter!

Here's a recap of everything we have learned in this chapter:

- git init for creating a new repository on our local machine
- git remote for connecting our local repository to GitHub
- git branch for renaming our branch
- git add and git commit for staging and committing our changes
- git status for checking the status of our files
- git push for pushing our code to GitHub

This is a lot to digest! So make sure to save this quick reference:`
          },
          {
            id: '1-6-2',
            title: 'Quick Reference',
            type: 'code',
            content: `git init
git remote add origin <repository_url>
git branch -M main
git add .
git commit -m 'Your commit message here!'
git status
git push -u origin main`
          },
          {
            id: '1-6-3',
            title: 'Create a README',
            type: 'text',
            content: `Let's wrap up the chapter with something fun and creative!

If you recall, we didn't include a README.md file when we created our first repository! This file is important for documenting what a repository is about, what the code does, or how it's maintained. It can be made locally in your working directory, and then pushed to GitHub.

Steps to create and push a README:
1. Create a new file in your project folder called README.md
2. Open the file in your code editor and add some text to describe your repository
3. Save the file and commit it to your local repository
4. Push the changes to GitHub

Note: README.md files are written in Markdown, a markup language that lets you add styled text, links, and even tables. This file documents what a repo is about, what the code does, or how it's maintained.

Take a look at some examples of README.md files that other users have created!`
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'HTML Basics',
    slug: 'html-basics',
    description: 'Create your first website with HTML. Learn about tags, elements, semantic HTML, and web page structure.',
    difficulty: 'beginner',
    category: 'Web Development',
    estimatedTime: '3h',
    lessons: [
      {
        id: '2-1',
        title: '01. Introduction to HTML',
        description: 'HTML Fundamentals',
        sections: [
          {
            id: '2-1-1',
            title: 'What is HTML?',
            type: 'text',
            content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the structure and content of websites.

HTML uses a system of tags and elements to tell the browser how to display content.`
          },
          {
            id: '2-1-2',
            title: 'HTML Document Structure',
            type: 'code',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>This is my first webpage.</p>
</body>
</html>`
          }
        ]
      },
      {
        id: '2-2',
        title: '02. HTML Tags',
        description: 'Common HTML Tags',
        sections: [
          {
            id: '2-2-1',
            title: 'Popular HTML Tags',
            type: 'text',
            content: `HTML uses tags to structure content:

- \`<h1> to <h6>\` - Headings (h1 is largest)
- \`<p>\` - Paragraphs
- \`<a>\` - Links
- \`<img>\` - Images
- \`<button>\` - Buttons
- \`<div>\` - Generic container
- \`<ul>, <ol>, <li>\` - Lists`
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'CSS Styling',
    slug: 'css-styling',
    description: 'Style your web pages with CSS. Learn selectors, properties, layouts, and responsive design.',
    difficulty: 'beginner',
    category: 'Web Development',
    estimatedTime: '5h',
    lessons: [
      {
        id: '3-1',
        title: '01. Introduction to CSS',
        description: 'CSS Basics',
        sections: [
          {
            id: '3-1-1',
            title: 'What is CSS?',
            type: 'text',
            content: `CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and positioning.

CSS works together with HTML: HTML provides the structure, CSS provides the styling.`
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    description: 'Learn programming with JavaScript. Master variables, functions, loops, and DOM manipulation.',
    difficulty: 'beginner',
    category: 'Programming',
    estimatedTime: '6h',
    lessons: [
      {
        id: '4-1',
        title: '01. JavaScript Basics',
        description: 'Getting Started with JavaScript',
        sections: [
          {
            id: '4-1-1',
            title: 'What is JavaScript?',
            type: 'text',
            content: `JavaScript is a programming language that makes web pages interactive. It runs in web browsers and can manipulate HTML and CSS.`
          }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'CI/CD Fundamentals',
    slug: 'cicd-fundamentals',
    description: 'Learn continuous integration and continuous deployment. Automate testing and deployments with pipelines.',
    difficulty: 'intermediate',
    category: 'DevOps',
    estimatedTime: '4h',
    lessons: [
      {
        id: '5-1',
        title: '01. What is CI/CD?',
        description: 'Understanding CI/CD',
        sections: [
          {
            id: '5-1-1',
            title: 'Introduction',
            type: 'text',
            content: `CI/CD stands for Continuous Integration and Continuous Deployment. It's a set of practices that automate parts of software development.`
          }
        ]
      }
    ]
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find(course => course.slug === slug);
}

export function getLessonById(courseSlug: string, lessonId: string): Lesson | undefined {
  const course = getCourseBySlug(courseSlug);
  return course?.lessons.find(lesson => lesson.id === lessonId);
}
