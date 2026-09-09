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
                    docker build --no-cache -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
                '''
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Push Image to ECR') {
            steps {
                sh '''
                    docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh '''
                    aws ecs update-service \
                        --cluster employee-ha-cluster \
                        --service employee-ha-service \
                        --force-new-deployment \
                        --region $AWS_REGION
                '''
            }
        }

        stage('Verify ECS Deployment') {
            steps {
                sh '''
                    echo "Waiting for ECS deployment..."

                    aws ecs wait services-stable \
                        --cluster employee-ha-cluster \
                        --services employee-ha-service \
                        --region $AWS_REGION

                    echo "ECS deployment is stable."

                    curl -f http://employee-ha-alb-1716773307.us-east-1.elb.amazonaws.com/api/users

                    echo ""
                    echo "ECS deployment verification successful."
                '''
            }
        }
    }
}