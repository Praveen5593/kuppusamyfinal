pipeline {
    agent any

    stages {

        stage('Docker Compose Build') {
            steps {
                sh '''
                    cd /home/ec2-user/my-backend
                    docker compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /home/ec2-user/my-backend
                    docker compose down
                    docker compose up -d
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    docker ps
                    curl -f http://localhost:3001/api/users
                '''
            }
        }
    }
}
