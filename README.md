# INSTALLATION 
npm install 

# Database postgress sql config 
modify .env file 

# RUN DEV 
npm run dev 

# front end static files
app/public

# bonus questions 
1. How’d you design the system architecture of this to support 1m daily active users, if all the users input were contributing to the frequency
Answer: i will use index on word field column and use cache when user request same data so it dont need pull from database everytime

2. If 2/3rds of the users came from the US, what changes would have to be made in the architecture to increase performance?
Answer: i am not sure with this. probably use aws server and set proper region for US users. 
