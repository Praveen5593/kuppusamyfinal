pipeline {
    agent any

    stages {

        stage('Docker Build') {
            steps {
                sh 'docker build -t employee-backend:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop employee-backend || true
                    docker rm employee-backend || true

                    docker run -d \
                      --name employee-backend \
                      --env-file /home/ec2-user/my-backend/.env \
                      -p 3000:3000 \
                      employee-backend:latest
                '''
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps --filter name=employee-backend'
                sh 'curl -f http://localhost:3000/api/users'
            }
        }
    }
}
