pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = '203800220670.dkr.ecr.us-east-1.amazonaws.com'
        ECR_REPOSITORY = 'fullstack-app'
        IMAGE_TAG = 'latest'
    }

    stages {

        stage('Update Code') {
            steps {
                sh '''
                    git -C /home/ec2-user/my-backend pull origin main
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    cd /home/ec2-user/my-backend

                    docker build --no-cache \
                        -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
                '''
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login \
                        --username AWS \
                        --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Push Image to ECR') {
            steps {
                sh '''
                    docker push \
                        $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /home/ec2-user/my-backend

                    docker compose down
                    docker compose pull
                    docker compose up -d
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    docker ps
                    sleep 5
                    curl -f http://localhost:3001/api/users
                '''
            }
        }
    }
}
