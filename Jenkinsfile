pipeline {
    agent any

    options {
        disableConcurrentBuilds()  // Prevents multiple concurrent builds
    }

    environment {
        REPO_URL = 'https://github.com/ISA-Consulting/ISAWorkBridge-Frontend.git'
        APP_NAME = 'isa-next-app'  // PM2 process name
        APP_PORT = '4000'  // Port Next.js will run on
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

        stage('Prepare Deployment Directory') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        echo "Setting up deployment directory..."
                        sudo mkdir -p ${env.APP_DIR}
                        sudo chown -R jenkins:jenkins ${env.APP_DIR}
                        sudo chmod -R 775 ${env.APP_DIR}
                        sudo rm -rf ${env.APP_DIR}/*  # Clean old files before copying new ones
                        cp -r ${WORKSPACE}/* ${env.APP_DIR}/  # Copy code from workspace
                        echo "Workspace copied to deployment directory."
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
                        npm ci
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
                        npm run build  # Creates a Next.js production build
                    """
                }
            }
        }

        stage('Setup PM2 & Run Next.js from Build') {
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
                                    script: "node_modules/.bin/next",
                                    args: "start",
                                    cwd: "${env.APP_DIR}",
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
