pipeline {
    agent any

    options {
        disableConcurrentBuilds()  // Prevents multiple concurrent builds
    }

    environment {
        REPO_URL = 'https://github.com/ISA-Consulting/ISAWorkBridge-Frontend.git'
        APP_NAME = 'isa-next-app'  // Name of the PM2 process
        APP_PORT = '4000'  // Change to port 4000
    }

    stages {
        stage('Set Environment Variables') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'development') {
                        env.NODE_LABEL = 'master'
                        env.SERVER_USER = 'jenkins'
                        env.SERVER_IP = 'localhost'
                        env.NODE_ENV = 'development'
                        env.ENV_PATH = '/var/lib/jenkins/envFiles/workbridgeFrontendEnv/.env'
                        env.APP_DIR = '/var/www/workbridge-frontend-dev'
                    } else if (env.BRANCH_NAME == 'prod') {
                        env.NODE_LABEL = 'production'
                        env.SERVER_USER = 'jenkins'
                        env.SERVER_IP = '13.48.115.146'  // Replace with actual production IP
                        env.NODE_ENV = 'production'
                        env.ENV_PATH = '/home/jenkins/envFiles/workbridgeFrontendEnv/.env'
                        env.APP_DIR = '/var/www/workbridge-frontend'
                    } else {
                        error "Unsupported branch: ${env.BRANCH_NAME}"
                    }
                    echo "Deploying ${APP_NAME} to ${env.NODE_ENV} environment at ${env.APP_DIR}"
                }
            }
        }

        stage('Clone Repository') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        echo "Cloning repository..."
                        sudo mkdir -p ${env.APP_DIR}
                        sudo chown -R jenkins:jenkins ${env.APP_DIR}
                        cd ${env.APP_DIR}
                        if [ -d ".git" ]; then
                            git reset --hard
                            git pull origin ${env.BRANCH_NAME}
                        else
                            git clone -b ${env.BRANCH_NAME} ${env.REPO_URL} ${env.APP_DIR}
                        fi
                        echo "Repository cloned successfully."
                    """
                }
            }
        }

        stage('Copy Environment File') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        echo "Copying environment file..."
                        cp ${env.ENV_PATH} ${env.APP_DIR}/.env.local
                        echo "Environment file copied."
                    """
                }
            }
        }

        stage('Install Dependencies') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        cd ${env.APP_DIR}
                        npm install
                    """
                }
            }
        }

        stage('Build Next.js Application') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        cd ${env.APP_DIR}
                        npm run build
                    """
                }
            }
        }

        stage('Setup PM2 Ecosystem & Start App') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        cd ${env.APP_DIR}
                        echo "Creating PM2 ecosystem.config.js file..."
                        cat > ecosystem.config.js <<EOL
                        module.exports = {
                            apps: [
                                {
                                    name: "${APP_NAME}",
                                    script: "npm",
                                    args: "start",
                                    env: {
                                        NODE_ENV: "${env.NODE_ENV}",
                                        PORT: ${env.APP_PORT}
                                    }
                                }
                            ]
                        };
                        EOL

                        echo "Restarting Next.js application with PM2..."
                        pm2 delete ${APP_NAME} || true  # Stop existing app if running
                        pm2 start ecosystem.config.js
                        pm2 save
                        pm2 restart ${APP_NAME}
                        echo "Next.js application is now running on port ${APP_PORT}"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment to ${env.BRANCH_NAME} environment was successful!"
        }
        failure {
            echo "❌ Deployment to ${env.BRANCH_NAME} environment failed!"
        }
    }
}
