// eslint-disable-next-line import/no-extraneous-dependencies
import scanner from 'sonarqube-scanner'
import dotenv from 'dotenv'

dotenv.config()
scanner(
  {
    serverUrl: process.env.SONARQUBE_URL,
    token : process.env.SONARQUBE_TOKEN,
    options: {
      'sonar.projectName': 'ModelerUI',
      'sonar.projectKey': process.env.SONARQUBE_PROJECT_KEY ,
      'sonar.projectDescription': 'ModelerUI',
      'sonar.sources': 'src',
      'sonar.test.inclusions': 'src/**/*.spec.ts,src/**/*.spec.tsx'
    }
  },
  () => process.exit()
)
