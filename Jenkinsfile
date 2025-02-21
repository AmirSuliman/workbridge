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
                        env.SERVER_IP = '13.48.115.146'
                        // env.NODE_ENV = 'production'
                        env.ENV_PATH = '/var/lib/jenkins/envFiles/workbridgeFrontendEnv/.env'
                        env.APP_DIR = '/var/www/workbridge-frontend-dev'
                    } else if (env.BRANCH_NAME == 'prod') {
                        env.NODE_LABEL = 'production'
                        env.SERVER_USER = 'jenkins'
                        env.SERVER_IP = '13.48.115.146'  // Replace with actual production IP
                        // env.NODE_ENV = 'production'
                        env.ENV_PATH = '/home/jenkins/envFiles/workbridgeFrontendEnv/.env'
                        env.APP_DIR = '/var/www/workbridge-frontend'
                    } else {
                        error "Unsupported branch: ${env.BRANCH_NAME}"
                    }
                    // echo "🚀 Deploying ${APP_NAME} to ${env.NODE_ENV} at ${env.APP_DIR}"
                }
            }
        }

        stage('Prepare Deployment Directory') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        echo "🔧 Ensuring deployment directory exists..."
                        sudo mkdir -p ${env.APP_DIR} || exit 1
                        sudo chown -R jenkins:jenkins ${env.APP_DIR} || exit 1
                        sudo chmod -R 775 ${env.APP_DIR} || exit 1

                        echo "🗑️ Cleaning old files..."
                        sudo rm -rf ${env.APP_DIR}/* || exit 1

                        if [ -d "${WORKSPACE}" ]; then
                            echo "📂 Copying workspace files..."
                            cp -r ${WORKSPACE}/* ${env.APP_DIR}/ || exit 1
                        else
                            echo "❌ Workspace directory is missing!"
                            exit 1
                        fi

                        echo "✅ Workspace copied successfully."
                    """
                }
            }
        }

        stage('Copy Environment File') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        echo "🔑 Checking environment file..."
                        if [ -f "${env.ENV_PATH}" ]; then
                            echo "📄 Copying environment file..."
                            cp ${env.ENV_PATH} ${env.APP_DIR}/.env.local || exit 1
                            echo "✅ Environment file copied."
                        else
                            echo "❌ Environment file not found: ${env.ENV_PATH}"
                            exit 1
                        fi
                    """
                }
            }
        }

        stage('Install Dependencies') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        cd ${env.APP_DIR} || exit 1
                        echo "📦 Installing dependencies..."
                        npm i || exit 1  # Ensures clean install with exact versions
                        echo "✅ Dependencies installed successfully."
                    """
                }
            }
        }

        stage('Build Next.js Application') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        cd ${env.APP_DIR} || exit 1
                        echo "🏗️ Building Next.js application..."
                        npm run build || exit 1
                        echo "✅ Build completed successfully."
                    """
                }
            }
        }

        stage('Setup PM2 & Run Next.js from Build') {
            agent { label "${env.NODE_LABEL}" }
            steps {
                script {
                    sh """
                        cd ${env.APP_DIR} || exit 1
                        echo "⚙️ Creating PM2 ecosystem.config.js file..."

                        # Generate ecosystem.config.js properly
                        cat <<EOF > ecosystem.config.js
module.exports = {
    apps: [
        {
            name: "${APP_NAME}",
            script: "node_modules/next/dist/bin/next",
            args: "start",
            cwd: "${env.APP_DIR}",
            env: {

                PORT: ${env.APP_PORT}
            }
        }
    ]
};
EOF

                        echo "🔄 Restarting Next.js application with PM2..."
                        pm2 delete ${APP_NAME} || true  # Stop existing app if running
                        pm2 start ecosystem.config.js || exit 1
                        pm2 save || exit 1
                        pm2 restart ${APP_NAME} || exit 1
                        echo "✅ Next.js is now running on port ${APP_PORT}"
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
