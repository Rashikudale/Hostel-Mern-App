pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "likita/backend-app"
        FRONTEND_IMAGE = "likita/frontend-app"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git credentialsId: 'Disseratation', branch: 'main', url: 'https://github.com/LikitaKalluri/Roomiehub'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo '🔧 Building Backend Image...'
                sh 'docker build -t $BACKEND_IMAGE .'
            }
        }

        stage('Build Frontend Docker Image (Nginx)') {
            steps {
                echo '🎨 Building Frontend Image with Nginx...'
                dir('client') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                echo '🧹 Cleaning old containers (if any)...'
                sh '''
                    docker rm -f backend || true
                    docker rm -f frontend || true
                '''
            }
        }

        stage('Run Backend Container') {
            steps {
                echo '🚀 Starting Backend Container...'
                sh 'docker run -d --name backend --env-file .env -p 3000:3000 $BACKEND_IMAGE'
            }
        }

        stage('Run Frontend Container') {
            steps {
                echo '🌐 Starting Frontend Container (Nginx)...'
                sh 'docker run -d --name frontend -p 80:80 $FRONTEND_IMAGE'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Deployment failed. Check the logs for more info.'
        }
    }
}
