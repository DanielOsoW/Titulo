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
                            dir("/var/lib/jenkins/workspace/backTitulo"){			
                                sh 'source venv/bin/activate'
                                sh 'python manage.py runserver 0.0.0.0:8081'
                            }
                        },
                        b: {
                            dir("/var/lib/jenkins/workspace/Titulo"){
                                sleep(10)//sh 'export NODE_OPTIONS=--max_old_space_size=8096'
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