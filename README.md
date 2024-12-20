# Portfolio

## Description
A dynamic dashboard designed to monitor key metrics such as total visitors, emails received, and project management tasks. Built with modern technologies like Next.js, AWS, NextAuth for authentication, and PostgreSQL for data management, providing a seamless and secure user experience for tracking and managing important project insights.

## PROJECT STRUCTURE

```
├── CHANGELOG.md
├── components.json
├── compose.yaml
├── Dockerfile
├── next-env.d.ts
├── next.config.ts
├── output.txt
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
|  ├── migrations
|  └── schema.prisma
├── public
├── README.Docker.md
├── README.md
├── src
|  ├── app
|  ├── assets
|  ├── components
|  ├── hooks
|  ├── interfaces
|  ├── lib
|  ├── middleware.ts
|  ├── schema
|  ├── swr
|  └── types
├── tailwind.config.ts
└── tsconfig.json
```

## Environment Variables

```
AWS_SKEY = your-aws-secret-key
AWS_AKEY = your-aws-access-key
AWS_REGION = aws-region
AWS_BUCKET_NAME= aws-bucket-name


NEXT_PUBLIC_AWS_LINK = your aws bucket link (should be accessible via public since we are fetching the images)

NEXT_PUBLIC_EMAILJS_SERVICE_ID= your-emailjs-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID= your-emailjs-template-id
NEXT_PUBLIC_EMAILJS_PK= your-emailjs-private-key
NEXT_PUBLIC_USER = 9d6f76b3-68f5-47e9-9c76-6b819770d166

URL = http://localhost:3000 - default, if you plan to deploy your website change this url to your website's url.

EMAIL = your-email-address

# Please refer to this documentation https://supabase.com/partners/integrations/prisma

DATABASE_URL= your-database-url
DIRECT_URL= your-database-url
        
NEXTAUTH_URL=http://localhost:3000 - default, if you plan to deploy this project do not include this.
NEXTAUTH_SECRET= your-own-secret key.
```

## Development server

To run the development server:
1. `npm run install --force` I am using NextJS 15 with React 19 hence --force option is needed.
2. `npx prisma generate` to generate schema models
3. `npm run dev`

## Docker 
To run the dockerize app please make sure that you have already created .env file and ensure that there are no missing attributes.

There are several ways to run the application
1. `docker-compose up` - Easiest
2. Build the docker with volumes `docker build -t <name> . ` and to run `docker run -p 3000:3000 <name>`.

## Key Features
This project's key feature is an all in one portfolio with dashboard for key metrics monitoring. Here are the key features.
1. Key Metrics Monitoring: Track total projects, total visitors, and total emails with visual charts.
2. Project Creation: Includes support for file uploads.
3. Secure Authentication: Built with NextAuth for enhanced security.
4. File Storage: Integrated with AWS S3 for efficient and reliable file storage.
5. CI/CD Versioning: Set up with GitHub Actions for continuous integration and deployment (ongoing).
6. Dockerized Application: Simplified deployment and usage through containerization.

Built with love <3 

[![Technologies](https://skillicons.dev/icons?i=aws,ts,react,prisma,nextjs,tailwind,githubactions,docker,supabase)](https://skillicons.dev)