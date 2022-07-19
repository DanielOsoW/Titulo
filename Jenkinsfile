pipeline {
    agent any
    stages {
        stage('Inicio'){
            steps{
                echo "Iniciando"
            } 
        }

        stage('Levantar backend y frontend'){
                steps{
                    parallel(
                        a: {
                            dir("/var/lib/jenkins/workspace/memoria/backTitulo"){			
                                sh 'source venv/bin/activate'
                                sh 'python manage.py runserver 0.0.0.0:8081'
                            }
                        },
                        b: {
                            dir("/var/lib/jenkins/workspace/memoria/Titulo"){
                                sleep(5)//sh 'export NODE_OPTIONS=--max_old_space_size=8096'
                                sh 'npm install'
                                sh 'npm update vue-template-compiler'
                                sh 'npm run serve'
                            }
                        }
                    ) 
                }             
        }
        stage('Fin'){
                steps{
                    echo "Terminado"
                } 
            }
        

        }
}