// eslint-disable-next-line import/no-extraneous-dependencies
import scanner from 'sonarqube-scanner'
import dotenv from 'dotenv'

dotenv.config()
scanner(
  {
    serverUrl: process.env.SONARQUBE_URL,
    options: {
      'sonar.projectName': 'ModelerUI',
      'sonar.token': process.env.SONARQUBE_TOKEN,
      'sonar.projectKey': process.env.SONARQUBE_PROJECT_KEY,
      'sonar.projectDescription': 'ModelerUI',
      'sonar.sources': 'src',
      'sonar.test.inclusions': 'src/tests/**,cypress/**'
    }
  },
  () => process.exit()
)
