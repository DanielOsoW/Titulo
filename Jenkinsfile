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
                            dir("/var/lib/jenkins/workspace/Memoria/backTitulo"){			
                                sh 'source venv/bin/activate'
                                sh 'python manage.py runserver 8081'
                            }
                        },
                        b: {
                            dir("/var/lib/jenkins/workspace/Memoria/Titulo"){
                                sh 'export NODE_OPTIONS=--max_old_space_size=8096'
                                sh 'npm run serve — –port 3000'
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