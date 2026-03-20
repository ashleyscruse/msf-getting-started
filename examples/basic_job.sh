#!/bin/bash
#SBATCH -J basic_job              # Job name
#SBATCH -o basic_job.%j.out       # Output file (%j = job ID)
#SBATCH -e basic_job.%j.err       # Error file
#SBATCH -p development            # Queue (use "development" for testing)
#SBATCH -N 1                      # Number of nodes
#SBATCH -n 1                      # Number of tasks
#SBATCH -t 00:10:00               # Wall clock time (10 minutes)
#SBATCH -A YOUR_ALLOCATION        # Replace with your allocation name

echo "Job started at $(date)"
echo "Running on node: $(hostname)"
echo "Hello from TACC!"
echo "Job finished at $(date)"
