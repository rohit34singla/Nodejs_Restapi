# Nodejs_Restapi
#pipeline script

pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    environment {
        SONAR_TOKEN = credentials('sonar-token') // Correct ID of SonarQube token in Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    changelog: false,
                    poll: false,
                    url: 'https://github.com/rohit34singla/Nodejs_Restapi.git',
                    credentialsId: 'github-credentials-id'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    if (isUnix()) {
                        // For Linux/Mac
                        sh "sonar-scanner -Dsonar.projectKey=Nodejs_Restapi -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=${env.SONAR_TOKEN}"
                    } else {
                        // For Windows
                        bat "sonar-scanner.bat -Dsonar.projectKey=Nodejs_Restapi -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=${env.SONAR_TOKEN}"
                    }
                }
            }
        }
    }
}
