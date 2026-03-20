#!/bin/bash
#SBATCH -J python_job             # Job name
#SBATCH -o python_job.%j.out      # Output file (%j = job ID)
#SBATCH -e python_job.%j.err      # Error file
#SBATCH -p development            # Queue (use "development" for testing)
#SBATCH -N 1                      # Number of nodes
#SBATCH -n 1                      # Number of tasks
#SBATCH -t 00:30:00               # Wall clock time (30 minutes)
#SBATCH -A YOUR_ALLOCATION        # Replace with your allocation name

# Load Python
module load python3

# Run your script from $WORK
cd $WORK/my_project
python3 my_script.py

echo "Job finished at $(date)"
