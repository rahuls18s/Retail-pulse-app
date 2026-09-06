pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build Angular') {
            steps {
                bat 'npm run build -- --configuration production'
            }
        }

        stage('Deploy to AWS S3') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'AWS_S3_CREDENTIALS',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    bat 'aws s3 sync "dist\\retail-pulse-lab\\browser" "s3://retail-pulse-lab-angular" --delete --region ap-south-1'
                }
            }
        }
    }
}