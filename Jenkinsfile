pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Praveen5593/kuppusamyfinal.git'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t employee-backend:latest .'
            }
        }

        stage('Docker Test') {
            steps {
                sh 'docker images employee-backend:latest'
            }
        }
    }
}
