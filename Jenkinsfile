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

        stage('Deploy to Vercel') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'VERCEL_TOKEN',
                        variable: 'VERCEL_TOKEN'
                    )
                ]) {
                    bat 'npx vercel --prod --yes --token=%VERCEL_TOKEN%'
                }
            }
        }
    }
}